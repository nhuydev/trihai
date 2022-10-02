import { Button, Container, Dropdown, Grid, Image, Pagination } from '@nextui-org/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalExport from '../../components/ModalExport';
import useWindowSize from '../../hooks/useWindowSize';
import { currencyFormat } from '../../utils';

import domtoimage from 'dom-to-image';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import readXlsxFile from 'read-excel-file';
import noData from '../../assets/noData.png';
import firstSlide from '../../assets/slideShow/1.png';
import secondSlide from '../../assets/slideShow/2.png';
import thirdSlide from '../../assets/slideShow/3.png';
import forthSlide from '../../assets/slideShow/4.png';
import fifthSlide from '../../assets/slideShow/5.png';
import logo from '../../assets/successLogo.png';
import Filter from '../../components/Filter';
import InfoCompany from '../../components/InfoCompany';
import PageImport from '../../components/PageExport/PageImport';
import Slider from 'react-slick';

const images = [firstSlide, secondSlide, thirdSlide, forthSlide, fifthSlide];

function Import() {
    const navigate = useNavigate();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [visible, setVisible] = React.useState(false);
    //   categories

    const [visibleModalExport, setVisibleModalExport] = React.useState(false);
    const [dataImage, setDataImage] = useState<any>([]);
    // console.log("🚀 ~ file: index.tsx ~ line 59 ~ Import ~ dataImage", dataImage);
    //   mockData.sort((a: any, b: any) => +a.price - +b.price)
    const [page, setPage] = React.useState(1);

    const [canvasData, setCanvasData] = useState<any>([]);
    const { width } = useWindowSize();

    const [selectedCate, setSelectedCate] = React.useState('');

    const refComponent = React.useRef<any>();

    const [elRefs, setElRefs] = React.useState([]);
    const [totalImages, setTotalImages] = React.useState([]);
    const [arrLengthPage, setArrLengthPage] = React.useState<number>();

    React.useEffect(() => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            toast.success('Tải lên thông tin thành công!');
            readXlsxFile(acceptedFiles[0]).then((rows: any) => {
                const removeDontexist = rows.filter((row: any, index: number) => row[3] && row[2] && row[6]);
                removeDontexist.shift();

                setTotalImages(removeDontexist);

                // `rows` is an array of rows
                // each row being an array of cells.
            });
        }
    }, [acceptedFiles]);

    React.useEffect(() => {
        if (selectedCate) {
            setDataImage((prev: any) =>
                totalImages.filter((row: any) => {
                    return row[4] && row[4] == (selectedCate as any).replaceAll('_', ' ');
                })
            );
        }
    }, [selectedCate]);

    const handleScreenCapture = async () => {
        setVisibleModalExport(true);

        setVisible(true);
        elRefs.forEach(async (elRef: any) => {
            await domtoimage
                .toPng(elRef.current, {
                    bgcolor: 'white',
                    quality: 0.2,
                })
                .then(function (dataUrl: any) {
                    setCanvasData((prev: any) => [...prev, dataUrl]);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
            setVisible(false);
        });
    };

    let countImgEx = Math.ceil(dataImage.length / 18);
    let remainder = dataImage.length % 18;

    React.useEffect(() => {
        if (dataImage.length > 0 && remainder < 6 && countImgEx > 1) {
            countImgEx -= 1;
        }
        setArrLengthPage(countImgEx);
        // add or remove refs
        if (countImgEx > 0) {
            setElRefs(
                (elRefs) => {
                    return Array(countImgEx)
                        ?.fill(undefined)
                        ?.map((_, i) => elRefs[i] || React.createRef());
                }
                //@ts-ignore
            );
        }
    }, [countImgEx]);

    const handleChangeSort = (value: any) => {
        const sortImage =
            value === 'gia'
                ? [...dataImage].sort((a: any, b: any) => +a[2] - +b[2])
                : [...dataImage].sort((a: any, b: any) => a[1].localeCompare(b[1]));

        setDataImage(sortImage);
    };

    const closeHandler = () => {
        setVisibleModalExport(false);
        setCanvasData([]);
    };

    const handleChangeFilter = React.useCallback((selected: any) => {
        setSelectedCate(selected[0] || selected?.anchorKey);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div ref={refComponent} className="w-fit">
                <div className="pt-4 flex justify-center items-center">
                    <div className="mr-8 relative">
                        <div>
                            <Image objectFit="cover" height={200} src={logo} />
                        </div>
                        <div className="absolute bottom-14 right-3">
                            <Dropdown placement="bottom-left">
                                <Dropdown.Trigger>
                                    <Button animated={false} color="gradient" bordered auto rounded>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            style={{ fill: '#000' }}
                                        >
                                            <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path>
                                            <path d="m8 11-3 4h11l-4-6-3 4z"></path>
                                            <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                                        </svg>
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Menu
                                    onAction={(key: any) => {
                                        if (key === 'file') {
                                            if (!selectedCate || selectedCate === 'Chọn_danh_mục')
                                                return toast('Tải dữ liệu danh mục lên trước');
                                            // handleScreenCapture();
                                        }

                                        if (key === 'gender') {
                                            handleScreenCapture();
                                        }

                                        if (key === 'back') {
                                            return navigate(-1);
                                        }
                                    }}
                                    color="primary"
                                    aria-label="Avatar Actions"
                                >
                                    <Dropdown.Item
                                        key="gender"
                                        textValue="gender"
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                style={{ fill: '#000' }}
                                            >
                                                <path d="M19.924 10.383a1 1 0 0 0-.217-1.09l-5-5-1.414 1.414L16.586 9H4v2h15a1 1 0 0 0 .924-.617zM4.076 13.617a1 1 0 0 0 .217 1.09l5 5 1.414-1.414L7.414 15H20v-2H5a.999.999 0 0 0-.924.617z"></path>
                                            </svg>
                                        }
                                    >
                                        <div className="font-semibold">Tự động tạo ảnh</div>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                style={{ fill: '#000' }}
                                            >
                                                <path d="M20 14V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-7v3l-5-4 5-4v3h7zM13 4l5 5h-5V4z"></path>
                                            </svg>
                                        }
                                        textValue="file"
                                        key="file"
                                        withDivider
                                    >
                                        <section>
                                            <div
                                                {...getRootProps({
                                                    className: 'dropzone',
                                                    onClick: (event) => !selectedCate && event.stopPropagation(),
                                                })}
                                            >
                                                <input
                                                    disabled={!selectedCate || selectedCate === 'Chọn_danh_mục'}
                                                    {...getInputProps()}
                                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                />
                                                <div className="font-semibold">Kéo thả hoặc chọn file</div>
                                            </div>
                                        </section>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                style={{ fill: '#000' }}
                                            >
                                                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                                            </svg>
                                        }
                                        textValue="back"
                                        key="back"
                                        withDivider
                                    >
                                        <div className="font-semibold">Trở lại</div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <InfoCompany />
                </div>
                <div className="flex justify-center">
                    <Container style={{ margin: 0 }} lg>
                        <Filter handleChangeFilter={handleChangeFilter} handleChangeSort={handleChangeSort} />

                        <Grid.Container gap={1}>
                            {dataImage && dataImage.length > 0 ? (
                                dataImage.slice((page - 1) * 18, page * 18).map((item: any, index: number) => {
                                    return (
                                        <Grid key={index} xs={4} md={2} xl={2} css={{ fontSize: '1rem' }}>
                                            <div className="flex flex-col justify-between  min-w-[200px]">
                                                <Image
                                                    showSkeleton
                                                    alt="ảnh lỗi"
                                                    objectFit="cover"
                                                    height="100%"
                                                    width="100%"
                                                    style={{ minHeight: '200px' }}
                                                    className="shadow-lg rounded-3xl max-h-[180px] min-w-full"
                                                    src={item[6] || 'https://via.placeholder.com/150'}
                                                />
                                                <p className="text-center pt-1 px-2 text-md font-semibold">
                                                    {item[1]?.slice(
                                                        0,
                                                        item[1].split('').indexOf('(') > 0
                                                            ? item[1].split('').indexOf('(')
                                                            : item[1].split('').length
                                                    )}
                                                </p>
                                                <div>
                                                    {item[1]?.split('').indexOf('(') > 0 && (
                                                        <p className="text-center mb-1 text-md font-semibold">
                                                            {item[1]?.slice(item[1].split('').indexOf('('))}
                                                        </p>
                                                    )}
                                                </div>
                                                <div
                                                    className={`flex ${item[5] ? 'justify-evenly' : 'justify-center'}`}
                                                >
                                                    <span className="font-semibold text-md text-red-500">
                                                        {currencyFormat(item[2])} đ
                                                    </span>
                                                    <div className="text-center flex items-center">
                                                        {item[5] && (
                                                            <div className="font-semibold text-xs">(1 {item[5]})</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    );
                                })
                            ) : (
                                <Grid xs={12} sm={12}>
                                    <div className="w-full">
                                        <div className="flex justify-center">
                                            <Image width={300} src={noData} alt="Default Image" objectFit="cover" />
                                        </div>
                                        <div className="text-center mt-2 text-xl">Danh sách trống</div>
                                    </div>
                                </Grid>
                            )}
                        </Grid.Container>
                    </Container>
                </div>
            </div>
            {dataImage && dataImage.length > 0 && (
                <PageImport
                    selectedCate={selectedCate}
                    dataImage={dataImage}
                    elRefs={elRefs}
                    arrLength={arrLengthPage}
                />
            )}
            {dataImage && dataImage.length > 0 && dataImage.length > Math.ceil(dataImage.length / 18) && (
                <div id="pagination_css" className="flex justify-center mb-10 mt-4">
                    <Pagination
                        rounded
                        total={Math.ceil(dataImage.length / 18)}
                        initialPage={1}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            )}
            {/* <div>
                <SimpleImageSlider
                    width={300}
                    height={300}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    bgColor={'#ffffffff'}
                    loop={true}
                    autoPlay={true}
                />
            </div> */}
            {/* <Slider {...settingsMoreProduct}>
                        {images.map((url: any, index: number) => (
                            <Image width={200} key={url} height={200} src={url} alt="Default Image" objectFit="cover" />
                        ))}
                    </Slider> */}
            <div className="flex justify-center mb-10 mt-4" style={{ width: '100%' }}>
                <Container style={{ margin: 0 }} lg>
                    <div className="flex">
                        {images.map((url: string) => (
                            <Image width={200} key={url} height={200} src={url} alt="Default Image" objectFit="cover" />
                        ))}
                    </div>
                </Container>
            </div>
            <ModalExport
                visibleLoading={visible}
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
