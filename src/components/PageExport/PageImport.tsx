import { Button, Container, Dropdown, Grid, Image } from "@nextui-org/react";
import React from "react";
import { currencyFormat } from "../../utils";
import Filter from "../Filter";
import logo from "../../assets/logo.png";
import InfoCompany from "../InfoCompany";
const PageImport = ({
  dataImage,
  elRefs,
  arrLength,
}: {
  dataImage: any;
  elRefs: any;
  arrLength: any;
}) => {
  return (
    <div style={{ maxHeight: "0px", overflow: "hidden" }}>
      {[...new Array(arrLength)].map((_, i) => (
        <div key={i} ref={elRefs[i]} className="w-fit ">
          <div className="pt-4 flex justify-center items-center">
            <div className="mr-8 relative">
              <Image
                style={{ borderRadius: "50%" }}
                objectFit="cover"
                width={200}
                height={200}
                src={logo}
              />
            </div>
            <InfoCompany />
          </div>
          <div className="flex justify-center">
            <Container style={{ margin: 0 }} lg>
              {/* <Filter handleChangeSort={handleChangeSort} /> */}

              <Grid.Container gap={1}>
                {dataImage &&
                  dataImage.length > 0 &&
                  dataImage
                    .slice(i * 18, (i + 1) * 18)
                    .map((item: any, index: any) => (
                      <Grid key={index} xs={4} md={2} xl={2}>
                        <div className="flex flex-col justify-between">
                          <div>
                            <Image
                              objectFit="cover"
                              height="100%"
                              width="100%"
                              className="shadow-lg rounded-3xl max-h-[180px] min-w-full"
                              src={item[6] || "https://via.placeholder.com/150"}
                            />
                            <p className="font-bold text-center pt-1">
                              {item[1]}
                            </p>
                          </div>
                          <div
                            className={`flex ${
                              item[5] ? "justify-evenly" : "justify-center"
                            }`}
                          >
                            <span className="font-semibold text-md text-red-500">
                              {currencyFormat(item[2])} đ
                            </span>
                            {item[5] && (
                              <span className="font-semibold text-md ">
                                (1 {item[5]})
                              </span>
                            )}
                          </div>
                        </div>
                      </Grid>
                    ))}
              </Grid.Container>
            </Container>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(PageImport);
