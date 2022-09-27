import React from "react";
import {
  Modal,
  useModal,
  Button,
  Text,
  Avatar,
  Container,
  Dropdown,
  Grid,
  Image,
  Popover,
  Pagination,
  Badge,
} from "@nextui-org/react";
import { ScreenCapture } from "react-screen-capture";
import guide from "../../assets/guide.png";
import guideMac from "../../assets/guide_macos.png";

import useWindowSize from "../../hooks/useWindowSize";
import { currencyFormat } from "../../utils";
import InfoCompany from "../InfoCompany";
import Filter from "../Filter";
const ModalCapture = ({ setVisible, bindings, dataImage }: any) => {
  const { width } = useWindowSize();
  const handleChangeSort = (value: any) => {
    value === "gia"
      ? dataImage.sort((a: any, b: any) => +a.price - +b.price)
      : dataImage.sort((a: any, b: any) => a.title.localeCompare(b.title));
  };
  return (
    <>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Body>
          <div
            style={{ zoom: width > 1367 ? "65%" : "50%" }}
            className={`bg-white overflow-hidden`}
          >
            <div className="flex justify-center items-center pb-2">
              <div className="mr-8">
                <Image
                  style={{ borderRadius: "50%" }}
                  objectFit="cover"
                  width={240}
                  height={240}
                  src="/logo.png"
                />
              </div>
              <InfoCompany />
            </div>
            <div className="flex justify-center w-full">
              <div className="container 2xl:px-[80px] flex flex-col justify-center w-full">
                <Filter handleChangeSort={handleChangeSort} />
                <Grid.Container gap={1}>
                  {dataImage &&
                    dataImage.length > 0 &&
                    dataImage.map((item: any, index: any) => (
                      <Grid key={index} xs={2} md={2} xl={2}>
                        <div className="flex flex-col">
                          <Image
                            objectFit="cover"
                            className="shadow-lg rounded-3xl"
                            src={item.image}
                          />
                          <p className="font-bold text-center pt-1">
                            {item.title}
                          </p>
                          <span className="font-semibold text-md text-center text-red-500">
                            {currencyFormat(item.price)} đ
                          </span>
                        </div>
                      </Grid>
                    ))}
                </Grid.Container>
                <div className="flex justify-center mb-10 mt-4">
                  <Pagination total={20} initialPage={1} />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onClick={() => setVisible(false)}>
            Đóng
          </Button>
          <Popover>
            <Popover.Trigger>
              <Button>
                {navigator.platform.indexOf("Win") > -1
                  ? "Bấm tổ hợp phím Window + Shift + S"
                  : "Bấm tổ hợp phím Shift + Command  + 4"}
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              {navigator.platform.indexOf("Win") > -1 ? (
                <Image src={guide} />
              ) : (
                <Image src={guideMac} />
              )}
            </Popover.Content>
          </Popover>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCapture;
