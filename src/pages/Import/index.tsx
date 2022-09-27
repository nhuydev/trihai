import {
  Avatar,
  Badge,
  Button,
  Container,
  Dropdown,
  Grid,
  Image,
  Pagination,
  Text,
  useModal,
} from "@nextui-org/react";
import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import capTure from "./assets/capture.png";
import { useNavigate } from "react-router-dom";
import { ScreenCapture } from "react-screen-capture";
import ModalCapture from "../../components/ModalCapture";
import { currencyFormat } from "../../utils";
import useWindowSize from "../../hooks/useWindowSize";
import ModalExport from "../../components/ModalExport";

import * as htmlToImage from "html-to-image";
import InfoCompany from "../../components/InfoCompany";
import Filter from "../../components/Filter";
import logo from "../../../public/logo.png";
import PageExport from "../../components/PageExport";
import { useDropzone } from "react-dropzone";
import readXlsxFile from "read-excel-file";
import PageImport from "../../components/PageExport/PageImport";

const mockData = [];

const toDataURL = (url: any) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

function Import() {
  const navigate = useNavigate();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  //   categories

  const [visibleModalExport, setVisibleModalExport] = React.useState(false);
  const [dataImage, setDataImage] = useState<any>([]);
  console.log("🚀 ~ file: index.tsx ~ line 54 ~ Import ~ dataImage", dataImage);
  //   mockData.sort((a: any, b: any) => +a.price - +b.price)
  const [page, setPage] = React.useState(1);

  const [canvasData, setCanvasData] = useState<any>([]);
  const { width } = useWindowSize();

  const refComponent = React.useRef<any>();

  const [elRefs, setElRefs] = React.useState([]);
  console.log("🚀 ~ file: index.tsx ~ line 65 ~ Import ~ elRefs", elRefs);

  React.useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      readXlsxFile(acceptedFiles[0]).then((rows: any) => {
        const removeDontexist = rows.filter(
          (row: any, index: number) => row[3]
        );
        removeDontexist.shift();

        setDataImage(removeDontexist);

        // `rows` is an array of rows
        // each row being an array of cells.
      });
    }
  }, [acceptedFiles]);

  const handleScreenCapture = async () => {
    elRefs.forEach(async (elRef: any) => {
      console.log(
        "🚀 ~ file: index.tsx ~ line 97 ~ elRefs.forEach ~ elRef",
        elRef
      );

      await htmlToImage
        .toPng(elRef?.current, { backgroundColor: "white", skipFonts: true })
        .then(function (dataUrl) {
          console.log("🚀 ~ file: index.tsx ~ line 95 ~ dataUrl", dataUrl);

          setCanvasData((prev: any) => [...prev, dataUrl]);
          setVisibleModalExport(true);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    });
  };

  React.useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      //@ts-ignore
      Array(Math.ceil(dataImage.length / 18))
        ?.fill(undefined)
        ?.map((_, i) => elRefs[i] || React.createRef())
    );
  }, [Math.ceil(dataImage.length / 18)]);

  const handleChangeSort = (value: any) => {
    const sortImage =
      value === "gia"
        ? [...dataImage].sort((a: any, b: any) => +a.price - +b.price)
        : [...dataImage].sort((a: any, b: any) =>
            a.title.localeCompare(b.title)
          );

    setDataImage(sortImage);
  };

  const closeHandler = () => {
    setVisibleModalExport(false);
    setCanvasData([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={refComponent} className="w-fit">
        <div className="pt-4 flex justify-center items-center">
          <div className="mr-8 relative">
            <Image
              style={{ borderRadius: "50%" }}
              objectFit="cover"
              width={200}
              height={200}
              src={logo}
            />
            <div className="absolute bottom-4 right-3">
              <Dropdown placement="bottom-left">
                <Dropdown.Trigger>
                  <Button
                    animated={false}
                    color="gradient"
                    bordered
                    auto
                    rounded
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      style={{ fill: "#000" }}
                    >
                      <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path>
                      <path d="m8 11-3 4h11l-4-6-3 4z"></path>
                      <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                    </svg>
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu
                  onAction={(key: any) => {
                    if (key === "file") {
                      return navigate("/import");
                    }

                    handleScreenCapture();
                  }}
                  color="primary"
                  aria-label="Avatar Actions"
                  disabledKeys={width < 768 ? "snip" : ""}
                >
                  <Dropdown.Item
                    key="snip"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ fill: "#000" }}
                      >
                        <path d="M10 6.5C10 4.57 8.43 3 6.5 3S3 4.57 3 6.5 4.57 10 6.5 10a3.45 3.45 0 0 0 1.613-.413l2.357 2.528-2.318 2.318A3.46 3.46 0 0 0 6.5 14C4.57 14 3 15.57 3 17.5S4.57 21 6.5 21s3.5-1.57 3.5-3.5c0-.601-.166-1.158-.434-1.652l2.269-2.268L17 19.121a3 3 0 0 0 2.121.879H22L9.35 8.518c.406-.572.65-1.265.65-2.018zM6.5 8C5.673 8 5 7.327 5 6.5S5.673 5 6.5 5 8 5.673 8 6.5 7.327 8 6.5 8zm0 11c-.827 0-1.5-.673-1.5-1.5S5.673 16 6.5 16s1.5.673 1.5 1.5S7.327 19 6.5 19z"></path>
                        <path d="m17 4.879-3.707 4.414 1.414 1.414L22 4h-2.879A3 3 0 0 0 17 4.879z"></path>
                      </svg>
                    }
                  >
                    <div className="font-semibold">Cắt ảnh</div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="gender"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ fill: "#000" }}
                      >
                        <path d="M19.924 10.383a1 1 0 0 0-.217-1.09l-5-5-1.414 1.414L16.586 9H4v2h15a1 1 0 0 0 .924-.617zM4.076 13.617a1 1 0 0 0 .217 1.09l5 5 1.414-1.414L7.414 15H20v-2H5a.999.999 0 0 0-.924.617z"></path>
                      </svg>
                    }
                  >
                    <div className="font-semibold">Tự động tạo ảnh</div>
                  </Dropdown.Item>
                  <Dropdown.Item key="file" withDivider>
                    <section>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input
                          {...getInputProps()}
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                        <div className="font-semibold">
                          Kéo thả hoặc chọn file
                        </div>
                      </div>
                    </section>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <InfoCompany />
        </div>
        <div className="flex justify-center">
          <Container style={{ margin: 0 }} lg>
            <Filter handleChangeSort={handleChangeSort} />

            <Grid.Container gap={1}>
              {dataImage &&
                dataImage.length > 0 &&
                dataImage
                  .slice((page - 1) * 18, page * 18)
                  .map((item: any, index: number) => (
                    <Grid key={index} xs={4} md={2} xl={2}>
                      <div className="flex flex-col">
                        <Image
                          objectFit="cover"
                          height="100%"
                          width="100%"
                          className="shadow-lg rounded-3xl"
                          src={item[6] || "https://via.placeholder.com/150"}
                        />
                        <p className="font-bold text-center pt-1">{item[1]}</p>
                        <span className="font-semibold text-md text-center text-red-500">
                          {currencyFormat(item[2])} đ
                        </span>
                      </div>
                    </Grid>
                  ))}
            </Grid.Container>
          </Container>
        </div>
      </div>
      {dataImage && dataImage.length > 0 && (
        <PageImport
          dataImage={dataImage}
          elRefs={elRefs}
          arrLength={Math.ceil(dataImage.length / 18)}
        />
      )}
      {dataImage &&
        dataImage.length > 0 &&
        dataImage.length > Math.ceil(dataImage.length / 18) && (
          <div id="pagination_css" className="flex justify-center mb-10 mt-4">
            <Pagination
              rounded
              total={Math.ceil(dataImage.length / 18)}
              initialPage={1}
              onChange={(page) => setPage(page)}
            />
          </div>
        )}

      <ModalExport
        refComponent={refComponent}
        canvasData={canvasData}
        visible={visibleModalExport}
        setVisible={setVisibleModalExport}
        closeHandler={closeHandler}
      />
    </div>
  );
}

export default Import;
