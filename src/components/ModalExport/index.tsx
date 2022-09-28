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
import { exportComponentAsPNG } from "react-component-export-image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { copyImageToClipboard } from "copy-image-clipboard";

const ModalExport = ({
  visible,
  canvasData,
  closeHandler,
  refComponent,
  visibleLoading,
}: any) => {
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
                      <Button
                        onClick={async () => {
                          await copyImageToClipboard(view);
                        }}
                        auto
                      >
                        Coppy
                      </Button>
                    </Card.Body>
                  </Card>
                </Grid>
              ))}
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Đóng
            </Button>
            <Button auto onClick={() => exportComponentAsPNG(refComponent)}>
              Tải xuống
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ModalExport;
