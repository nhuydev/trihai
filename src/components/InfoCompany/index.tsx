import React from "react";

const InfoCompany = () => {
  return (
    <div>
      <h3>Công Ty TNHH Trí Hải Complex</h3>
      <p className="font-medium">
        Địa chỉ: SN 2, Ngõ 36 Hoàng Quốc Việt, Nghĩa đô, Cầu Giấy, Hà Nội
      </p>
      <p className="font-medium">Điện thoại: 0888.533.886</p>
      <p className="text-red-600 font-medium italic text-[16px]">
        TPbank - 02972708601 - MBank: 00130319953333
      </p>
      <p className="text-red-600 font-medium italic text-[16px]">
        Chủ tài khoản: Nguyễn Chí Hải - Nội dung chuyển khoản: Tên KH + SĐT Đặt
        hàng
      </p>
      <h2 className="uppercase text-red-500 mt-3 font-mono text-2xl">
        Báo giá ngày {new Date().toLocaleDateString()}
      </h2>
    </div>
  );
};

export default React.memo(InfoCompany);
