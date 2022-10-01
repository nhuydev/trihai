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

const ModalExport = ({
  visible,
  canvasData,
  closeHandler,
  refComponent,
  visibleLoading,
}: any) => {
  const [imageDownload, setImageDownload] = React.useState([]);

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
    if (imageDownload.length < 1) {
      canvasData.map((e) => saveAs(e));
    } else {
      imageDownload.map((e) => saveAs(e));
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
                      css={{ margin: "10px 0 0 10px" }}
                      color="primary"
                    />
                    <Card.Body>
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
                    <Card.Footer>
                      <Button
                        style={{ width: "100%" }}
                        onClick={async () => {
                          await copyImageToClipboard(view);
                        }}
                        auto
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
