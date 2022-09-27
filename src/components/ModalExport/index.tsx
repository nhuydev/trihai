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
} from "@nextui-org/react";
import { exportComponentAsPNG } from "react-component-export-image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ModalExport = ({
  visible,
  canvasData,
  closeHandler,
  refComponent,
}: any) => {
  return (
    <PhotoProvider>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="1000px"
        css={{ zIndex: 10 }}
        // fullScreen
      >
        <Modal.Body>
          <Grid.Container gap={2} justify="flex-start">
            {canvasData.map((view: any) => (
              <Grid xs={6} sm={3}>
                <Card isHoverable isPressable>
                  <Card.Body>
                    <PhotoView src={view}>
                      <Card.Image src={view} objectFit="cover" width="100%" />
                    </PhotoView>
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
      </Modal>
    </PhotoProvider>
  );
};

export default ModalExport;
