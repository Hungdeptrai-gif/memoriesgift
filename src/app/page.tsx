'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LegoConfig {
  version: number;
  background: string;
  clothes: string;
  face: string;
  hair: string;
  hat: string;
  accessories: string[];
  pets: string[];
  backgroundNote: string;
}

interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  deliveryDate: string;
  email: string;
  note: string;
  agreeToTerms: boolean;
}

const VERSIONS = [
  { id: 1, name: 'Version 1', price: 230000 },
  { id: 2, name: 'Version 2', price: 240000 },
  { id: 3, name: 'Version 3', price: 245000 }
];

const BACKGROUNDS = [
  { 
    name: 'Thành phố', 
    image: '/city-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHg9IjQwIiB5PSIxNjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI5NiIgZmlsbD0iIzY2NjY2NiIvPgo8cmVjdCB4PSI5MCIgeT0iMTQwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTE2IiBmaWxsPSIjNjY2NjY2Ii8+CjxyZWN0IHg9IjE0MCIgeT0iMTgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNzYiIGZpbGw9IiM2NjY2NjYiLz4KPHJlY3QgeD0iMTkwIiB5PSIxNjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI5NiIgZmlsbD0iIzY2NjY2NiIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM5OTk5OTkiLz4KPC9zdmc+'
  },
  { 
    name: 'Biển', 
    image: '/beach-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjODlDQ0ZGIi8+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iNjQiIHk9IjE5MiIgZmlsbD0iI0ZGRDcwMCIvPgo8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSIyMCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIxOTIiIGN5PSI5NiIgcj0iMTYiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+'
  },
  { 
    name: 'Núi', 
    image: '/mountain-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjODlDQ0ZGIi8+CjxwYXRoIGQ9Ik0wLDI1Nkw2NCwxMjhMMTI4LDE5MkwxOTIsOTZMMjU2LDE2MFYyNTZaIiBmaWxsPSIjNjY2NjY2Ii8+CjxwYXRoIGQ9Ik02NCwxMjhMMTI4LDE5MkwxOTIsOTZMMjU2LDE2MFYyNTZaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPg=='
  },
  { 
    name: 'Rừng', 
    image: '/forest-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMjI4QjIyIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjMwIiBmaWxsPSIjMDA4MDAwIi8+CjxjaXJjbGUgY3g9IjE5MiIgY3k9IjY0IiByPSIyNSIgZmlsbD0iIzAwODAwMCIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSI5NiIgcj0iMzUiIGZpbGw9IiMwMDgwMDAiLz4KPHJlY3QgeD0iMCIgeT0iMTYwIHdpZHRoPSIyNTYiIGhlaWdodD0iOTYiIGZpbGw9IiM2NjQ0MDAiLz4KPC9zdmc+'
  },
  { 
    name: 'Nhà', 
    image: '/house-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjODlDQ0ZGIi8+CjxwYXRoIGQ9Ik0xMjgsMzJMMjI0LDEyOEgxOTJWMjI0SDE2NFYxMjhIMTI4WiIgZmlsbD0iI0ZGRDcwMCIvPgo8cmVjdCB4PSIxNDQiIHk9IjE2MCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjY0IiBmaWxsPSIjQ0M4ODAwIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjE5MiIgcj0iNCIgZmlsbD0iIzAwMDAwMCIvPgo8L3N2Zz4='
  },
  { 
    name: 'Văn phòng', 
    image: '/office-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjMyIiB5PSIzMiIgd2lkdGg9IjE5MiIgaGVpZ2h0PSIxOTIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjQ4IiB5PSI0OCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjQ0NDQ0NDIiLz4KPHJlY3QgeD0iMTYwIiB5PSI0OCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjQ0NDQ0NDIiLz4KPHJlY3QgeD0iNDgiIHk9IjExMiIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNDQ0NDQ0MiIvPgo8L3N2Zz4='
  },
  { 
    name: 'Trường học', 
    image: '/school-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjODlDQ0ZGIi8+CjxwYXRoIGQ9Ik0xMjgsMzJMMjI0LDEyOEgxOTJWMjI0SDE2NFYxMjhIMTI4WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI0OCIgeT0iMTI4IHdpZHRoPSIxNjAiIGhlaWdodD0iOTYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjE3NiIgcj0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8L3N2Zz4='
  },
  { 
    name: 'Công viên', 
    image: '/park-bg.jpg', 
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMjI4QjIyIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjIwIiBmaWxsPSIjMDA4MDAwIi8+CjxjaXJjbGUgY3g9IjE5MiIgY3k9IjY0IiByPSIyMCIgZmlsbD0iIzAwODAwMCIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSI5NiIgcj0iMjAiIGZpbGw9IiMwMDgwMDAiLz4KPHJlY3QgeD0iMCIgeT0iMTYwIHdpZHRoPSIyNTYiIGhlaWdodD0iOTYiIGZpbGw9IiM2NjQ0MDAiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iMjA4IiByPSIxNiIgZmlsbD0iIzAwODAwMCIvPgo8L3N2Zz4='
  }
];

const CLOTHES = [
  'Áo thun', 'Áo sơ mi', 'Áo vest', 'Váy', 'Quần jean', 'Quần short', 'Đồ thể thao'
];

const FACES = [
  'Vui vẻ', 'Nghiêm túc', 'Ngạc nhiên', 'Bình thường', 'Cười', 'Buồn'
];

const HAIRS = [
  'Tóc ngắn', 'Tóc dài', 'Tóc xoăn', 'Tóc thẳng', 'Tóc nhuộm', 'Hói'
];

const HATS = [
  'Mũ bóng chày', 'Mũ len', 'Mũ cowboy', 'Mũ nón', 'Mũ beret', 'Không đội mũ'
];

const ACCESSORIES = [
  { name: 'Kính mắt', price: 10000 },
  { name: 'Túi xách', price: 15000 },
  { name: 'Đồng hồ', price: 20000 },
  { name: 'Vòng tay', price: 10000 },
  { name: 'Dây chuyền', price: 15000 }
];

const PETS = [
  { name: 'Chó', price: 15000 },
  { name: 'Mèo', price: 15000 },
  { name: 'Thỏ', price: 20000 },
  { name: 'Chim', price: 20000 }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [legoConfig, setLegoConfig] = useState<LegoConfig>({
    version: 1,
    background: '',
    clothes: '',
    face: '',
    hair: '',
    hat: '',
    accessories: [],
    pets: [],
    backgroundNote: ''
  });
  
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
    email: '',
    note: '',
    agreeToTerms: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedBackgroundPreview, setSelectedBackgroundPreview] = useState<string>('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const totalPrice = () => {
    let basePrice = VERSIONS.find(v => v.id === legoConfig.version)?.price || 0;
    let accessoriesPrice = legoConfig.accessories.reduce((sum, acc) => {
      const item = ACCESSORIES.find(a => a.name === acc);
      return sum + (item?.price || 0);
    }, 0);
    let petsPrice = legoConfig.pets.reduce((sum, pet) => {
      const item = PETS.find(p => p.name === pet);
      return sum + (item?.price || 0);
    }, 0);
    let hairPrice = legoConfig.hair ? 25000 : 0;
    
    return basePrice + accessoriesPrice + petsPrice + hairPrice;
  };

  const handleVersionSelect = (version: number) => {
    setLegoConfig(prev => ({ ...prev, version }));
  };

  const handleBackgroundSelect = (background: string) => {
    setLegoConfig(prev => ({ ...prev, background }));
    // Find the background object to get the preview image
    const bgObj = BACKGROUNDS.find(bg => bg.name === background);
    if (bgObj) {
      setSelectedBackgroundPreview(bgObj.preview);
    }
  };

  const handleImageClick = (image: string, title: string) => {
    setModalImage(image);
    setModalTitle(title);
    setShowImageModal(true);
  };

  const handleClothesSelect = (clothes: string) => {
    setLegoConfig(prev => ({ ...prev, clothes }));
  };

  const handleFaceSelect = (face: string) => {
    setLegoConfig(prev => ({ ...prev, face }));
  };

  const handleHairSelect = (hair: string) => {
    setLegoConfig(prev => ({ ...prev, hair }));
  };

  const handleHatSelect = (hat: string) => {
    setLegoConfig(prev => ({ ...prev, hat }));
  };

  const handleAccessoryToggle = (accessory: string) => {
    setLegoConfig(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }));
  };

  const handlePetToggle = (pet: string) => {
    setLegoConfig(prev => ({
      ...prev,
      pets: prev.pets.includes(pet)
        ? prev.pets.filter(p => p !== pet)
        : [...prev.pets, pet]
    }));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Chọn Version</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VERSIONS.map(version => (
                <div
                  key={version.id}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    legoConfig.version === version.id
                      ? 'border-pink bg-transparent'
                      : 'border-light-gray hover:border-pink'
                  }`}
                  onClick={() => handleVersionSelect(version.id)}
                >
                  <h3 className="text-lg font-semibold mb-2 text-white">{version.name}</h3>
                  <p className="text-2xl font-bold text-pink">{version.price.toLocaleString('vi-VN')}₫</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
  return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Thiết Kế Background</h2>
            
            {/* Background Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {BACKGROUNDS.map(bg => (
                <div
                  key={bg.name}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    legoConfig.background === bg.name
                      ? 'border-pink bg-transparent'
                      : 'border-light-gray hover:border-pink'
                  }`}
                  onClick={() => handleBackgroundSelect(bg.name)}
                  onMouseEnter={() => setSelectedBackgroundPreview(bg.preview)}
                  onMouseLeave={() => {
                    if (legoConfig.background) {
                      const selectedBg = BACKGROUNDS.find(b => b.name === legoConfig.background);
                      setSelectedBackgroundPreview(selectedBg?.preview || '');
                    } else {
                      setSelectedBackgroundPreview('');
                    }
                  }}
                >
                  <span className="text-white">{bg.name}</span>
                </div>
              ))}
            </div>

            {/* Background Preview */}
            {selectedBackgroundPreview && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {legoConfig.background ? `Preview: ${legoConfig.background}` : 'Hover để xem preview'}
                </h3>
                <div className="flex justify-center">
                  <div 
                    className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-pink shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleImageClick(selectedBackgroundPreview, legoConfig.background || 'Background Preview')}
                  >
        <Image
                      src={selectedBackgroundPreview}
                      alt="Background Preview"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjNDQ0NDQ0Ii8+Cjx0ZXh0IHg9IjEyOCIgeT0iMTI4IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJldmlldzwvdGV4dD4KPC9zdmc+';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <div className="text-white opacity-0 hover:opacity-100 transition-opacity text-sm font-medium">
                        Click để xem rõ hơn
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Background Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-pink-200 mb-2">
                Ghi chú cho background
              </label>
              <textarea
                className="w-full p-3 border border-pink rounded-lg"
                rows={3}
                placeholder="Mô tả chi tiết về background bạn muốn..."
                value={legoConfig.backgroundNote}
                onChange={(e) => setLegoConfig(prev => ({ ...prev, backgroundNote: e.target.value }))}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Nhân Vật</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Áo & Quần</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CLOTHES.map(cloth => (
                  <div
                    key={cloth}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.clothes === cloth
                        ? 'border-pink bg-transparent'
                        : 'border-light-gray hover:border-pink'
                    }`}
                    onClick={() => handleClothesSelect(cloth)}
                  >
                    <span className="text-white">{cloth}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Khuôn Mặt</h3>
              <p className="text-sm text-light-pink font-bold mb-4">Miễn phí lựa chọn (Chọn tối đa 1 khuôn mặt)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FACES.map(face => (
                  <div
                    key={face}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.face === face
                        ? 'border-pink bg-transparent'
                        : 'border-light-gray hover:border-pink'
                    }`}
                    onClick={() => handleFaceSelect(face)}
                  >
                    <span className="text-white">{face}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tóc</h3>
              <p className="text-sm text-gray-600 mb-4">+25.000₫/lựa chọn</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HAIRS.map(hair => (
                  <div
                    key={hair}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.hair === hair
                        ? 'border-pink bg-transparent'
                        : 'border-light-gray hover:border-pink'
                    }`}
                    onClick={() => handleHairSelect(hair)}
                  >
                    <span className="text-white">{hair}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Mũ</h3>
              <p className="text-sm text-gray-600 mb-4">Chọn mũ – bấm để chọn/nhấn lại để bỏ chọn</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HATS.map(hat => (
                  <div
                    key={hat}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.hat === hat
                        ? 'border-pink bg-transparent'
                        : 'border-light-gray hover:border-pink'
                    }`}
                    onClick={() => handleHatSelect(hat)}
                  >
                    <span className="text-white">{hat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Phụ Kiện & Thú Cưng</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Phụ Kiện</h3>
              <p className="text-sm text-gray-600 mb-4">Giá từ +10.000₫ - +20.000₫</p>
              <p className="text-sm text-gray-600 mb-4">(Nhấp chọn phụ kiện rồi điều chỉnh số lượng)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ACCESSORIES.map(acc => (
                  <div
                    key={acc.name}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.accessories.includes(acc.name)
                        ? 'border-pink bg-transparent'
                        : 'border-light-gray hover:border-pink'
                    }`}
                    onClick={() => handleAccessoryToggle(acc.name)}
                  >
                    <div className="text-white">{acc.name}</div>
                    <div className="text-sm text-pink">+{acc.price.toLocaleString('vi-VN')}₫</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Thú Cưng</h3>
              <p className="text-sm text-gray-600 mb-4">Giá từ +15.000₫ - +20.000₫</p>
              <p className="text-sm text-gray-600 mb-4">(Nhấp chọn thú cưng rồi điều chỉnh số lượng)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PETS.map(pet => (
                  <div
                    key={pet.name}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.pets.includes(pet.name)
                        ? 'border-pink bg-transparent'
                        : 'border-light-gray hover:border-pink'
                    }`}
                    onClick={() => handlePetToggle(pet.name)}
                  >
                    <div className="text-white">{pet.name}</div>
                    <div className="text-sm text-pink">+{pet.price.toLocaleString('vi-VN')}₫</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Thông Tin Đặt Hàng</h2>
            <form onSubmit={handleOrderSubmit} className="max-w-md mx-auto text-left">
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-light-gray rounded-lg bg-card-dark text-white placeholder-pastel-pink focus:border-pink focus:outline-none"
                  placeholder="Vui lòng nhập họ tên"
                  value={orderInfo.name}
                  onChange={(e) => setOrderInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 border border-light-gray rounded-lg bg-card-dark text-white placeholder-pastel-pink focus:border-pink focus:outline-none"
                  placeholder="Vui lòng nhập số điện thoại"
                  value={orderInfo.phone}
                  onChange={(e) => setOrderInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Địa chỉ nhận hàng *
                </label>
                <textarea
                  required
                  className="w-full p-3 border border-light-gray rounded-lg bg-card-dark text-white placeholder-pastel-pink focus:border-pink focus:outline-none"
                  rows={3}
                  placeholder="Vui lòng nhập địa chỉ"
                  value={orderInfo.address}
                  onChange={(e) => setOrderInfo(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Ngày nhận hàng *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-light-gray rounded-lg bg-card-dark text-white placeholder-pastel-pink focus:border-pink focus:outline-none"
                  placeholder="Vui lòng nhập ngày nhận hàng (định dạng dd/mm)"
                  value={orderInfo.deliveryDate}
                  onChange={(e) => setOrderInfo(prev => ({ ...prev, deliveryDate: e.target.value }))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Email (nếu có)
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-light-gray rounded-lg bg-card-dark text-white placeholder-pastel-pink focus:border-pink focus:outline-none"
                  placeholder="Email (không bắt buộc)"
                  value={orderInfo.email}
                  onChange={(e) => setOrderInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Ghi chú
                </label>
                <textarea
                  className="w-full p-3 border border-light-gray rounded-lg bg-card-dark text-white placeholder-pastel-pink focus:border-pink focus:outline-none"
                  rows={3}
                  placeholder="Ghi chú thêm về đơn hàng..."
                  value={orderInfo.note}
                  onChange={(e) => setOrderInfo(prev => ({ ...prev, note: e.target.value }))}
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="mr-2"
                    checked={orderInfo.agreeToTerms}
                    onChange={(e) => setOrderInfo(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                  />
                  <span className="text-sm">
                    Tôi đồng ý với chính sách bảo hành & điều khoản của memories gifts
                  </span>
                </label>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center p-4">
        <div className="bg-card-dark rounded-lg shadow-lg border border-light-gray p-8 max-w-md w-full text-center">
          <div className="text-pink text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-white mb-4">Đặt hàng thành công!</h1>
          <p className="text-pastel-pink mb-6">
            Cảm ơn bạn đã chọn Memories Gifts để gửi gắm món quà đặc biệt!
          </p>
          
          <div className="bg-dark-gray rounded-lg p-4 mb-6 text-left border border-light-gray">
            <p className="text-white"><strong>Tên KH:</strong> {orderInfo.name}</p>
            <p className="text-white"><strong>SĐT:</strong> {orderInfo.phone}</p>
            <p className="text-white"><strong>Địa chỉ:</strong> {orderInfo.address}</p>
            <p className="text-white"><strong>Ngày nhận:</strong> {orderInfo.deliveryDate}</p>
          </div>
          
          <p className="text-pastel-pink mb-6">
            Vui lòng liên hệ với shop để xác nhận đơn hàng.
          </p>
          
          <div className="space-y-2 text-sm text-pastel-pink">
            <p><strong>Zalo:</strong> 0964.393.115</p>
            <p><strong>Facebook:</strong> memoriesgifts</p>
            <p><strong>Instagram:</strong> memories_gifts</p>
          </div>
          
          <button
            onClick={() => {
              setShowSuccess(false);
              setCurrentStep(1);
              setLegoConfig({
                version: 1,
                background: '',
                clothes: '',
                face: '',
                hair: '',
                hat: '',
                accessories: [],
                pets: [],
                backgroundNote: ''
              });
              setOrderInfo({
                name: '',
                phone: '',
                address: '',
                deliveryDate: '',
                email: '',
                note: '',
                agreeToTerms: false
              });
            }}
            className="mt-6 bg-gradient-pink text-white px-6 py-3 rounded-lg hover:bg-pink transition-colors"
          >
            Đặt hàng mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-gray">
      {/* Header */}
      <header className="bg-header-pink shadow-sm border-b border-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-header-white">Memories Gifts</h1>
            </div>
            <div className="text-sm text-header-white">
              Bước {currentStep}/5
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Tranh Lego - Quà Tặng Cá Nhân Hóa Cho Mọi Dịp
          </h1>
          <p className="text-xl text-pastel-pink">
            Món quà ý nghĩa cho Anniversary, Tốt nghiệp, Sinh nhật... thể hiện cá tính riêng của bạn!
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-card-dark rounded-lg shadow-lg border border-light-gray p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg transition-colors ${
              currentStep === 1
                ? 'bg-light-gray text-white cursor-not-allowed opacity-50'
                : 'bg-light-gray text-white hover:bg-gray transition-colors'
            }`}
          >
            Quay lại
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-pink text-white rounded-lg hover:bg-pink transition-colors"
            >
              Tiếp theo
            </button>
          ) : (
            <button
              onClick={handleOrderSubmit}
              className="px-6 py-3 bg-gradient-pink text-white rounded-lg hover:bg-pink transition-colors"
            >
              Đặt hàng ngay
            </button>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-card-dark rounded-lg shadow-lg border border-light-gray p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">ĐƠN HÀNG CỦA BẠN</h3>
          
          <div className="space-y-2 text-sm text-white">
            <div className="flex justify-between">
              <span>Version {legoConfig.version}:</span>
              <span className="text-pink">{VERSIONS.find(v => v.id === legoConfig.version)?.price.toLocaleString('vi-VN')}₫</span>
            </div>
            
            {legoConfig.hair && (
              <div className="flex justify-between">
                <span>Tóc ({legoConfig.hair}):</span>
                <span className="text-pink">+25.000₫</span>
              </div>
            )}
            
            {legoConfig.accessories.map(acc => {
              const item = ACCESSORIES.find(a => a.name === acc);
              return (
                <div key={acc} className="flex justify-between">
                  <span>Phụ kiện ({acc}):</span>
                  <span className="text-pink">+{item?.price.toLocaleString('vi-VN')}₫</span>
                </div>
              );
            })}
            
            {legoConfig.pets.map(pet => {
              const item = PETS.find(p => p.name === pet);
              return (
                <div key={pet} className="flex justify-between">
                  <span>Thú cưng ({pet}):</span>
                  <span className="text-pink">+{item?.price.toLocaleString('vi-VN')}₫</span>
              </div>
                );
              })}
              
              <div className="border-t border-light-gray pt-2 mt-2">
                <div className="flex justify-between font-semibold text-white">
                  <span>Tổng cộng:</span>
                  <span className="text-pink">{totalPrice().toLocaleString('vi-VN')}₫</span>
                </div>
              </div>
            </div>
          </div>

        {/* Policies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card-dark rounded-lg shadow-lg border border-light-gray p-6">
            <h4 className="font-semibold mb-3 text-white">Chính sách bảo hành</h4>
            <ul className="text-sm text-pastel-pink space-y-1">
              <li>• Hoàn tiền 70% nếu sản phẩm lỗi do shop</li>
              <li>• Nếu lỗi do bưu điện: Shop hỗ trợ 50% phí ship</li>
              <li>• Không hỗ trợ đổi trả với sản phẩm custom</li>
            </ul>
          </div>

          <div className="bg-card-dark rounded-lg shadow-lg border border-light-gray p-6">
            <h4 className="font-semibold mb-3 text-white">Thanh toán & Giao hàng</h4>
            <ul className="text-sm text-pastel-pink space-y-1">
              <li>• Thanh toán trước 100% giá trị đơn hàng</li>
              <li>• Thời gian sản xuất: 1-2 ngày</li>
              <li>• Giao hàng thường: 3-7 ngày</li>
              <li>• Giao hàng nhanh: 1-3 ngày</li>
            </ul>
          </div>

          <div className="bg-card-dark rounded-lg shadow-lg border border-light-gray p-6">
            <h4 className="font-semibold mb-3 text-white">Liên hệ & Hỗ trợ</h4>
            <ul className="text-sm text-pastel-pink space-y-1">
              <li>• Hotline: 0964.393.115</li>
              <li>• Email: memoriesgifts@gmail.com</li>
              <li>• Địa chỉ: Hà Nội</li>
              <li>• Giờ làm việc: Full time (24/7)</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Memories Gifts. Đã đăng ký bản quyền.</p>
        </div>
      </footer>

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="bg-card-dark rounded-lg shadow-2xl border border-pink max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-light-gray">
              <h3 className="text-xl font-semibold text-white">{modalTitle}</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-pink hover:text-light-pink text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 flex justify-center">
              <div className="relative w-full max-w-2xl aspect-square">
          <Image
                  src={modalImage}
                  alt={modalTitle}
                  fill
                  className="object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjNDQ0NDQ0Ii8+Cjx0ZXh0IHg9IjEyOCIgeT0iMTI4IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RXJyb3I8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-light-gray text-center">
              <p className="text-pastel-pink text-sm">
                Click bên ngoài để đóng
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
