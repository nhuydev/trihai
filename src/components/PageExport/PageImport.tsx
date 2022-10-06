import { Button, Container, Dropdown, Grid, Image } from '@nextui-org/react';
import React from 'react';
import { currencyFormat } from '../../utils';
import Filter from '../Filter';
import logo from '../../assets/successLogo.png';
import InfoCompany from '../InfoCompany';

import firstSlide from '../../assets/slideShow/1.png';
import secondSlide from '../../assets/slideShow/2.png';
import thirdSlide from '../../assets/slideShow/3.png';
import forthSlide from '../../assets/slideShow/4.png';
import fifthSlide from '../../assets/slideShow/5.png';
import logocard from '../../assets/logo_card1.png';

const images = [firstSlide, thirdSlide, secondSlide, forthSlide, fifthSlide];

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
    const RenderImage = (item: any, index: any) => (
        <Grid key={index} xs={2} sm={2} className="relative">
            <div className="z-10 absolute left-2 top-2">
                <article className="badge pink">
                    <div className="rounded2 rounded-full">
                        <Image className="rounded-full" objectFit="cover" height={40} src={logocard} />
                    </div>
                </article>
            </div>
            <div className="flex flex-col justify-between min-w-[200px]">
                <Image
                    showSkeleton
                    alt="ảnh lỗi"
                    objectFit="cover"
                    height="100%"
                    width="100%"
                    style={{ minHeight: '200px', minWidth: '220px' }}
                    className="shadow-lg rounded-3xl max-h-[180px] min-w-full"
                    src={item[6] || 'https://via.placeholder.com/150'}
                />
                <p className="text-center pt-1 px-2 text-md font-semibold">
                    {item[1]?.slice(
                        0,
                        item[1]?.split('').indexOf('(') > 0
                            ? item[1]?.split('').indexOf('(')
                            : item[1]?.split('').length
                    )}
                </p>
                {item[1].split('').indexOf('(') > 0 && (
                    <p className="text-center mb-1 text-md font-semibold">
                        {item[1]?.slice(item[1].split('').indexOf('('))}
                    </p>
                )}

                <div className={`flex ${item[5] ? 'justify-evenly' : 'justify-center'}`}>
                    <span className="font-semibold text-md text-red-500">{currencyFormat(item[2])} đ</span>
                    <div className="text-center flex items-center">
                        {item[5] && <div className="font-semibold text-xs">(1 {item[5]})</div>}
                    </div>
                </div>
            </div>
        </Grid>
    );

    return (
        <div style={{ maxHeight: '0px', overflow: 'hidden', minWidth: '1400px' }}>
            {[...new Array(arrLength)].map((_, i) => {
                const checkLength = dataImage.length - (i + 1) * 18;
                return (
                    <div key={i} ref={elRefs[i]} className="w-fit ">
                        <div className="pt-4 flex justify-center items-center">
                            <div className="mr-8 relative">
                                <div>
                                    <Image objectFit="cover" height={200} src={logo} />
                                </div>
                            </div>
                            <InfoCompany />
                        </div>
                        <Grid.Container gap={2}>
                            <Grid xs={10}></Grid>
                            <Grid xs={2}>
                                <Button color="secondary" auto>
                                    {selectedCate && selectedCate.replaceAll('_', ' ')}
                                </Button>
                            </Grid>
                        </Grid.Container>

                        <div className="flex justify-center">
                            <Container style={{ margin: 0 }} lg>
                                {/* <Filter handleChangeSort={handleChangeSort} /> */}

                                <Grid.Container gap={1}>
                                    {dataImage && dataImage.length > 0 && checkLength && checkLength > 6
                                        ? dataImage
                                              .slice(i * 18, (i + 1) * 18)
                                              .map((item: any, index: any) => RenderImage(item, index))
                                        : dataImage
                                              .slice(i * 18, dataImage.length)
                                              .map((item: any, index: any) => RenderImage(item, index))}
                                </Grid.Container>
                            </Container>
                        </div>
                        <div className="flex justify-center pb-5 py-4" style={{ width: '100%' }}>
                            <div className="flex justify-center w-full items-center">
                                {images.map((url: string, index: number) => (
                                    <div key={url} className="mx-4 flex justify-center items-center">
                                        <Image
                                            width={index === 1 || index === 4 ? 110 : 100}
                                            height={index === 1 || index === 4 ? 110 : 100}
                                            src={url}
                                            alt="Default Image"
                                            objectFit="cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(PageImport);
