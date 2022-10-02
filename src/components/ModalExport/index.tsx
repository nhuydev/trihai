import React from "react";
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Image,
  Grid,
  Card,
  Loading,
} from "@nextui-org/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { copyImageToClipboard } from "copy-image-clipboard";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import Resizer from "react-image-file-resizer";
import { Icon } from "@iconify/react";

const ModalExport = ({
  visible,
  canvasData,
  closeHandler,
  refComponent,
  visibleLoading,
}: any) => {
  const [imageDownload, setImageDownload] = React.useState([]);
  const zip = new JSZip();

  const handleCheckBox = (Checked, view) => {
    if (Checked) {
      setImageDownload((prev) => [...prev, view]);
    } else {
      let arr = imageDownload.filter(function (item) {
        return item !== view;
      });
      setImageDownload(arr);
    }
  };

  const handleDownLoad = () => {
    function download(data) {
      const a = document.createElement("a");
      a.href = "data:application/zip;base64," + data;
      a.setAttribute("download", "imgs.zip");
      a.style.display = "none";
      a.addEventListener("click", (e) => e.stopPropagation()); // not relevant for modern browsers
      document.body.appendChild(a);
      setTimeout(() => {
        // setTimeout - not relevant for modern browsers
        a.click();
        document.body.removeChild(a);
      }, 0);
    }
    if (imageDownload.length < 1) {
      function download_all() {
        var zip1 = new JSZip();
        [...canvasData].forEach((img, i) =>
          zip1.file("img" + i + ".png", img.replace(/data:.*?;base64,/, ""), {
            base64: true,
          })
        );
        zip1.generateAsync({ type: "base64" }).then(download);
      }
      download_all();

      // canvasData.map((e) => saveAs(e));
    } else {
      function download_all() {
        var zip1 = new JSZip();
        [...imageDownload].forEach((img, i) =>
          zip1.file("img" + i + ".png", img.replace(/data:.*?;base64,/, ""), {
            base64: true,
          })
        );
        zip1.generateAsync({ type: "base64" }).then(download);
      }
      download_all();

      // imageDownload.map((e) => saveAs(e));
    }
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
      width="1000px"
      css={{ zIndex: 10 }}
      // fullScreen
    >
      {visibleLoading ? (
        <Modal.Body style={{ height: "200px" }}>
          <Loading type="spinner" size="lg" />
        </Modal.Body>
      ) : (
        <>
          <Modal.Body>
            <Grid.Container gap={2} justify="flex-start">
              {canvasData.map((view: any) => (
                <Grid xs={6} sm={3}>
                  <Card isHoverable isPressable>
                    <Checkbox
                      defaultSelected={false}
                      onChange={(Checked) => handleCheckBox(Checked, view)}
                      size="xl"
                      css={{ margin: "10px 0 0 10px", position: "absolute" }}
                      color="primary"
                    />
                    <Card.Body css={{ paddingBottom: "10px" }}>
                      <PhotoProvider>
                        <PhotoView src={view}>
                          <Card.Image
                            src={view}
                            objectFit="cover"
                            width="100%"
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </Card.Body>
                    <Card.Footer style={{ paddingTop: "0px" }}>
                      <Button
                        style={{ width: "100%" }}
                        onClick={async () => {
                          await copyImageToClipboard(view);
                        }}
                        auto
                        iconRight={
                          <Icon
                            icon="carbon:image-copy"
                            style={{
                              fontSize: "1rem",
                            }}
                          />
                        }
                      >
                        Coppy
                      </Button>
                    </Card.Footer>
                  </Card>
                </Grid>
              ))}
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Đóng
            </Button>
            <Button auto onClick={handleDownLoad}>
              Tải xuống
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ModalExport;
