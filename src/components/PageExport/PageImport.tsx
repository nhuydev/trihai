import { Button, Container, Dropdown, Grid, Image } from "@nextui-org/react";
import React from "react";
import { currencyFormat } from "../../utils";
import Filter from "../Filter";
import logo from "../../assets/TRIHAII-01.png";
import InfoCompany from "../InfoCompany";
const PageImport = ({
  dataImage,
  elRefs,
  arrLength,
  selectedCate,
}: {
  dataImage: any;
  elRefs: any;
  arrLength: any;
  selectedCate?: any;
}) => {
  const RenderImage = (item:any, index:any) => (
    <Grid key={index} xs={2} sm={2}>
      <div className="flex flex-col justify-between">
        <div>
          <Image
            objectFit="cover"
            height="100%"
            width="100%"
            className="shadow-lg rounded-3xl max-h-[180px] min-w-full"
            src={item[6] || "https://via.placeholder.com/150"}
          />
          <p
            className="  text-center pt-1"
            style={{ fontSize: "larger", fontWeight: 600 }}
          >
            {item[1]?.slice(
              0,
              item[1]?.split("").indexOf("(") > 0
                ? item[1].split("").indexOf("(")
                : item[1].split("").length
            )}
          </p>
          {item[1].split("").indexOf("(") > 0 && (
            <p
              className="  text-center "
              style={{ fontSize: "larger", fontWeight: 600 }}
            >
              {item[1]?.slice(item[1].split("").indexOf("("))}
            </p>
          )}
        </div>
        <div
          className={`flex ${item[5] ? "justify-evenly" : "justify-center"}`}
        >
          <span className="font-semibold text-md text-red-500">
            {currencyFormat(item[2])} đ
          </span>
          {item[5] && (
            <span className="font-semibold text-md ">(1 {item[5]})</span>
          )}
        </div>
      </div>
    </Grid>
  );

  return (
    <div style={{ maxHeight: "0px", overflow: "hidden", minWidth: "1400px" }}>
      {[...new Array(arrLength)].map((_, i) => {
        const checkLength = dataImage.length - (i + 1) * 18;
        return (
          <div key={i} ref={elRefs[i]} className="w-fit ">
            <div className="pt-4 flex justify-center items-center">
              <div className="mr-8 relative">
                <Image
                  style={{
                    borderRadius: "50%",
                    position: "absolute",
                    top: "-7%",
                  }}
                  objectFit="cover"
                  width={300}
                  height={300}
                  src={logo}
                />
              </div>
              <InfoCompany />
            </div>

            <Grid.Container gap={2}>
              <Grid xs={10}></Grid>
              <Grid xs={2}>
                <Button color="secondary" auto>
                  {selectedCate && selectedCate.replaceAll("_", " ")}
                </Button>
              </Grid>
            </Grid.Container>

            <div className="flex justify-center">
              <Container style={{ margin: 0 }} lg>
                {/* <Filter handleChangeSort={handleChangeSort} /> */}

                <Grid.Container gap={1}>
                  {dataImage &&
                  dataImage.length > 0 &&
                  checkLength &&
                  checkLength > 6
                    ? dataImage
                        .slice(i * 18, (i + 1) * 18)
                        .map((item: any, index: any) =>
                          RenderImage(item, index)
                        )
                    : dataImage
                        .slice(i * 18, dataImage.length)
                        .map((item: any, index: any) =>
                          RenderImage(item, index)
                        )}
                </Grid.Container>
              </Container>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PageImport);
