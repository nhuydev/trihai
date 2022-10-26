import { Badge } from '@nextui-org/react';
import React from 'react';

const InfoCompany = () => {
    return (
        <div>
            <h3>Công Ty TNHH Trí Hải Complex</h3>
            <p className="font-medium">Địa chỉ: SN 2, Ngõ 36 Hoàng Quốc Việt, Nghĩa đô, Cầu Giấy, Hà Nội</p>
            <p className="font-medium">Điện thoại: 0888.533.886</p>
            <p className="text-red-600 font-medium italic text-[16px]">TPbank - 02972708601 - MBank: 00130319953333</p>
            <p className="text-red-600 font-medium italic text-[16px]">
                Chủ tài khoản: Nguyễn Chí Hải - Nội dung chuyển khoản: Tên KH + SĐT Đặt hàng
            </p>
            <p className="max-w-fit font-bold text-sm mt-1 italic">
                * Hình ảnh chỉ mang tính chất minh họa do hàng về hàng ngày kích cỡ, giá thành, chất lượng khác nhau.
                Đối với hoa nhuộm, hình ảnh chỉ giống khoảng 7-80% so với thực tế. *
            </p>
            <h2 className="uppercase mt-3 font-serif font-bold text-3xl">
                Báo giá ngày {new Date().toLocaleDateString()}
            </h2>
        </div>
    );
};

export default React.memo(InfoCompany);
