import React from 'react';
import QRMB from '../../assets/qrMB.png';
import QRMP from '../../assets/qrTP.png';

const InfoCompany = () => {
    return (
        <div className="flex justify-between max-w-screen-lg items-center">
            <div className="px-4 pt-4">
                <h3 className="text-[32px] uppercase">Công Ty TNHH Trí Hải Complex</h3>
                <p className="font-medium text-[20px]">Địa chỉ: 97 P. Nguyễn Khuyến, Văn Miếu, Đống Đa, Hà Nội</p>
                <p className="font-medium text-[20px]">Điện thoại: 0888.533.886</p>
                {/* <p className="text-red-600 font-medium italic text-[16px]">TPbank - 02972708601 - MBank: 00130319953333</p>
            <p className="text-red-600 font-medium italic text-[16px]">
                Chủ tài khoản: Nguyễn Chí Hải - Nội dung chuyển khoản: Tên KH + SĐT Đặt hàng
            </p> */}
                <p className="max-w-fit font-bold text-red-600 text-[18px] mt-1">
                    * Hình ảnh chỉ mang tính chất minh họa do hàng về hàng ngày kích cỡ, giá thành, chất lượng khác
                    nhau. Đối với các dòng hoa nhuộm, hình ảnh chỉ giống khoảng 70-80% so với thực tế. *
                </p>
                <h2 className="uppercase mt-3 font-sans font-bold text-[38px]">
                    Báo giá ngày {new Date().toLocaleDateString()}
                </h2>
            </div>
            <div className="flex align-middle">
                <div>
                    <img src={QRMB} className="h-[250px] w-[250px]" style={{ objectFit: 'contain' }} />
                </div>
                <div>
                    <img src={QRMP} className="h-[250px] w-[250px]" style={{ objectFit: 'contain' }} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(InfoCompany);
