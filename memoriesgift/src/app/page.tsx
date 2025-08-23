'use client';

import { useEffect, useState } from 'react';

interface LegoConfig {
  version: number;
  background: string;
  clothes: string;
  face: string;
  hair: string[];
  hat: string[];
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
  { 
    id: 1, 
    name: 'Version 1', 
    price: 230000,
    features: [
      'Khung tranh với 01 Lego',
      'Thiệp The Luvin',
      'Tặng box quà sang trọng'
    ]
  },
  { 
    id: 2, 
    name: 'Version 2', 
    price: 240000,
    features: [
      'Khung tranh với 02 Lego',
      'Thiệp viết tay',
      'Tặng hộp quà sang trọng'
    ]
  },
  { 
    id: 3, 
    name: 'Version 3', 
    price: 245000,
    features: [
      'Khung tranh với 03 Lego',
      'Thiệp viết tay',
      'Tặng hộp quà sang trọng'
    ]
  }
];

const BACKGROUNDS = [
  { 
    name: 'Happy 1st Anniversary Pink', 
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Happy Valentine\'s', 
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Happy 1st Anniversary Music', 
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center',
    preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Happy Birthday', 
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Happy Graduation Pet Qr', 
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Spotify Music', 
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Happy Graduation', 
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Love Album 1', 
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Love Album 2', 
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Since We Met', 
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'I Miss You', 
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center'
  },
  { 
    name: 'Happy Anniversary (3 Pictures)', 
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop&crop=center', 
    preview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop&crop=center'
  }
];

const CLOTHES = [
  { name: 'Áo thun', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop&crop=center' },
  { name: 'Áo sơ mi', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop&crop=center' },
  { name: 'Áo vest', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&h=200&fit=crop&crop=center' },
  { name: 'Váy', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop&crop=center' },
  { name: 'Quần jean', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop&crop=center' },
  { name: 'Quần short', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop&crop=center' },
  { name: 'Đồ thể thao', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center' }
];

const FACES = [
  { name: 'Kiểu 1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 2', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 3', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 4', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 5', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 6', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 7', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 8', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', price: 0 },
  { name: 'Kiểu 9', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', price: 0 }
];

const HAIRS_MALE = [
  { name: 'Nam kiểu 1', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nam kiểu 2', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nam kiểu 3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nam kiểu 4', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nam kiểu 5', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nam kiểu 6', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nam kiểu 7', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nam kiểu 8', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', price: 25000 }
];

const HAIRS_FEMALE = [
  { name: 'Nữ kiểu 1', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 2', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 4', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 5', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 6', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 7', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 8', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 9', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 10', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 11', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', price: 25000 },
  { name: 'Nữ kiểu 12', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face', price: 25000 }
];

const HATS = [
  { name: 'Mũ tốt nghiệp', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center', price: 10000 },
  { name: 'Mũ 1', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 2', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 3', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 4', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 5', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 6', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 7', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 8', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 9', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop&crop=center', price: 15000 },
  { name: 'Mũ 10', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center', price: 10000 },
  { name: 'Mũ 11', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop&crop=center', price: 10000 },
  { name: 'Mũ 12', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center', price: 10000 }
];

const ACCESSORIES = [
  { name: 'Kính mắt', price: 10000, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop&crop=center' },
  { name: 'Túi xách', price: 15000, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop&crop=center' },
  { name: 'Đồng hồ', price: 20000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop&crop=center' },
  { name: 'Vòng tay', price: 10000, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop&crop=center' },
  { name: 'Dây chuyền', price: 15000, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop&crop=center' }
];

const PETS = [
  { name: 'Chó', price: 15000, image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=200&h=200&fit=crop&crop=center' },
  { name: 'Mèo', price: 15000, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&crop=center' },
  { name: 'Thỏ', price: 20000, image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop&crop=center' },
  { name: 'Chim', price: 20000, image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=200&h=200&fit=crop&crop=center' }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [legoConfig, setLegoConfig] = useState<LegoConfig>({
    version: 1,
    background: '',
    clothes: '',
    face: '',
    hair: [],
    hat: [],
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
  const [selectedBackgroundPreview, setSelectedBackgroundPreview] = useState<string>('https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
  const [selectedBackgroundFallback, setSelectedBackgroundFallback] = useState<string>('https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');
  const [modalFallback, setModalFallback] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  // Keep preview (main image) and fallback (preview image) synced with the currently selected background
  useEffect(() => {
    if (legoConfig.background) {
      const selectedBg = BACKGROUNDS.find(b => b.name === legoConfig.background);
      setSelectedBackgroundPreview(selectedBg?.image || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
      setSelectedBackgroundFallback(selectedBg?.preview || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
    } else {
      setSelectedBackgroundPreview('https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
      setSelectedBackgroundFallback('https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
    }
  }, [legoConfig.background]);

  const totalPrice = () => {
    const basePrice = VERSIONS.find(v => v.id === legoConfig.version)?.price || 0;
    const accessoriesPrice = legoConfig.accessories.reduce((sum, acc) => {
      const item = ACCESSORIES.find(a => a.name === acc);
      return sum + (item?.price || 0);
    }, 0);
    const petsPrice = legoConfig.pets.reduce((sum, pet) => {
      const item = PETS.find(p => p.name === pet);
      return sum + (item?.price || 0);
    }, 0);
    const hairPrice = legoConfig.hair.reduce((sum, hair) => {
      const maleHair = HAIRS_MALE.find(h => h.name === hair);
      const femaleHair = HAIRS_FEMALE.find(h => h.name === hair);
      return sum + (maleHair?.price || femaleHair?.price || 0);
    }, 0);
    const hatPrice = legoConfig.hat.reduce((sum, hat) => {
      const hatItem = HATS.find(h => h.name === hat);
      return sum + (hatItem?.price || 0);
    }, 0);
    
    return basePrice + accessoriesPrice + petsPrice + hairPrice + hatPrice;
  };

  const handleVersionSelect = (version: number) => {
    setLegoConfig(prev => ({ ...prev, version }));
  };

  const handleBackgroundSelect = (background: string) => {
    setLegoConfig(prev => ({ ...prev, background }));
    // Find the background object to get the preview image
    const bgObj = BACKGROUNDS.find(bg => bg.name === background);
    if (bgObj) {
      setSelectedBackgroundPreview(bgObj.image);
      setSelectedBackgroundFallback(bgObj.preview);
    }
  };

  const handleImageClick = (image: string, fallback: string, title: string) => {
    setModalImage(image);
    setModalFallback(fallback);
    setModalTitle(title);
    setShowImageModal(true);
  };

  const handleClothesSelect = (clothes: string) => {
    setLegoConfig(prev => ({ ...prev, clothes }));
  };

  const handleFaceSelect = (face: string) => {
    setLegoConfig(prev => ({ ...prev, face }));
  };

  const handleHairToggle = (hair: string) => {
    setLegoConfig(prev => ({
      ...prev,
      hair: prev.hair.includes(hair)
        ? prev.hair.filter(h => h !== hair)
        : [...prev.hair, hair]
    }));
  };

  const handleHatToggle = (hat: string) => {
    setLegoConfig(prev => ({
      ...prev,
      hat: prev.hat.includes(hat)
        ? prev.hat.filter(h => h !== hat)
        : [...prev.hat, hat]
    }));
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
                      ? 'border-pink-500 bg-transparent'
                      : 'border-gray-300 hover:border-pink-500'
                  }`}
                  onClick={() => handleVersionSelect(version.id)}
                >
                  <h3 className="text-lg font-semibold mb-2 text-pink-500">{version.name}</h3>
                  <p className="text-2xl font-bold text-pink-500 mb-1">{version.price.toLocaleString('vi-VN')}₫</p>
                  <p className="text-sm text-white mb-4">(Chưa gồm phí ship)</p>
                  
                  <ul className="text-left text-white text-sm space-y-1">
                    {version.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Thiết Kế Background</h2>
            
            {/* Modern Background Customization Component */}
            <div className="max-w-6xl mx-auto">

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Preview Container */}
                <div className="background-customization">
                  <div 
                    className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800 border-2 border-pink-500 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.02] group cursor-pointer"
                    onClick={() => {
                      const imgSrc = selectedBackgroundPreview || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham';
                      const fallbackSrc = selectedBackgroundFallback || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham';
                      if (imgSrc) {
                        handleImageClick(imgSrc, fallbackSrc || '', legoConfig.background || 'Preview sản phẩm');
                      }
                    }}
                  >
                    <div className="relative w-full h-96">
                      <img
                        id="main-preview"
                        src={selectedBackgroundPreview || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham'}
                        alt="Preview sản phẩm"
                        className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:brightness-110 hover:contrast-105"
                        style={{ 
                          filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'
                        }}
                          onLoad={() => {
                          console.log('Image loaded successfully:', selectedBackgroundPreview || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
                          }}
                          onError={(e) => {
                          console.log('Image failed to load:', e.currentTarget.src);
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const placeholder = target.parentElement?.querySelector('.placeholder');
                              if (placeholder) {
                                (placeholder as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                      
                      {/* Fallback Placeholder */}
                        <div 
                          className="placeholder absolute inset-0 bg-gray-600 flex items-center justify-center text-white text-sm hidden"
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">🖼️</div>
                            <div>Image Not Found</div>
                            <div className="text-xs text-gray-300 mt-1">
                            {legoConfig.background || 'Preview sản phẩm'}
                            </div>
                          </div>
                        </div>
                    </div>
                    
                    {/* Image Overlay Info */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm transition-all duration-300">
                      <p className="font-medium">{legoConfig.background || 'Preview sản phẩm'}</p>
                      <p className="text-xs opacity-90">Click để xem rõ hơn</p>
                    </div>
                    
                    {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                          <div className="text-white opacity-0 hover:opacity-100 transition-opacity text-sm font-medium">
                            Click để xem rõ hơn
                          </div>
                        </div>
                      </div>
                  </div>

                {/* Background Options */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Chọn Background</h3>
                  
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                    {BACKGROUNDS.map((bg) => (
                      <div
                        key={bg.name}
                        onClick={() => handleBackgroundSelect(bg.name)}
                        onMouseEnter={() => {
                          setSelectedBackgroundPreview(bg.image);
                          setSelectedBackgroundFallback(bg.preview);
                        }}
                        onMouseLeave={() => {
                          if (legoConfig.background) {
                            const selectedBg = BACKGROUNDS.find(b => b.name === legoConfig.background);
                            setSelectedBackgroundPreview(selectedBg?.image || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
                            setSelectedBackgroundFallback(selectedBg?.preview || 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
                          } else {
                            setSelectedBackgroundPreview('https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
                            setSelectedBackgroundFallback('https://via.placeholder.com/400x400/ff69b4/ffffff?text=Preview+San+Pham');
                          }
                        }}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ease-in-out hover:border-pink-500 hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${
                          legoConfig.background === bg.name
                            ? 'border-pink-500 shadow-lg ring-2 ring-pink-500 ring-opacity-50 bg-gray-700'
                            : 'border-gray-600 hover:bg-gray-700'
                        }`}
                      >
                        <div className="relative overflow-hidden aspect-square">
                          <img
                            src={bg.image}
                            alt={bg.name}
                            className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110"
                            onError={(e) => {
                              console.log('Image failed to load for:', bg.name);
                              e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(bg.name);
                            }}
                            onLoad={() => {
                              console.log('Image loaded successfully for:', bg.name);
                            }}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

                          {/* Selection indicator */}
                          {legoConfig.background === bg.name && (
                            <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">Chọn</span>
                          </div>
                        </div>
                        <div className="p-2 text-center">
                          <span className="text-sm text-white font-medium">{bg.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

            {/* Background Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-pink-200 mb-2">
                Ghi chú cho background
              </label>
              <textarea
                      className="w-full p-3 border border-pink-500 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none"
                rows={3}
                placeholder="Mô tả chi tiết về background bạn muốn..."
                value={legoConfig.backgroundNote}
                onChange={(e) => setLegoConfig(prev => ({ ...prev, backgroundNote: e.target.value }))}
              />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Nhân Vật</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Áo & Quần</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {CLOTHES.map(cloth => (
                  <div
                    key={cloth.name}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.clothes === cloth.name
                        ? 'border-pink-500 bg-transparent'
                        : 'border-gray-300 hover:border-pink-500'
                    }`}
                    onClick={() => handleClothesSelect(cloth.name)}
                  >
                    <div className="relative w-full aspect-square mb-2 rounded overflow-hidden">
                      <img
                        src={cloth.image}
                        alt={cloth.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(cloth.name);
                        }}
                      />
                    </div>
                    <span className="text-white text-sm text-center block">{cloth.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Khuôn Mặt</h3>
              <p className="text-sm text-white-300 font-medium mb-4">Miễn phí lựa chọn (Chọn tối đa 1 khuôn mặt)</p>
              <div className="grid grid-cols-3 gap-3">
                {FACES.map(face => (
                  <div
                    key={face.name}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.face === face.name
                        ? 'border-pink-500 bg-transparent'
                        : 'border-gray-300 hover:border-pink-500'
                    }`}
                    onClick={() => handleFaceSelect(face.name)}
                  >
                    <div className="relative w-full aspect-square mb-2 rounded overflow-hidden">
                      <img
                        src={face.image}
                        alt={face.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(face.name);
                        }}
                      />
                    </div>
                    <span className="text-white text-sm text-center block">{face.name}</span>
                    {face.price > 0 && (
                      <div className="text-sm text-pink-500 text-center">+{face.price.toLocaleString('vi-VN')}₫</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tóc</h3>
              
                            {/* Male Hair */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-white">Tóc nhân vật nam</h4>
                <div className="grid grid-cols-4 gap-3">
                  {HAIRS_MALE.map(hair => (
                    <div
                      key={hair.name}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        legoConfig.hair.includes(hair.name)
                          ? 'border-pink-500 bg-transparent'
                          : 'border-gray-300 hover:border-pink-500'
                      }`}
                      onClick={() => handleHairToggle(hair.name)}
                    >
                      <div className="relative w-full aspect-square mb-2 rounded overflow-hidden">
                        <img
                          src={hair.image}
                          alt={hair.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(hair.name);
                          }}
                        />
                      </div>
                      <span className="text-white text-sm text-center block">{hair.name}</span>
                      <div className="text-sm text-pink-500 text-center">+{hair.price.toLocaleString('vi-VN')}₫</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Female Hair */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-white">Tóc nhân vật nữ</h4>
                <div className="grid grid-cols-4 gap-3">
                  {HAIRS_FEMALE.map(hair => (
                    <div
                      key={hair.name}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        legoConfig.hair.includes(hair.name)
                          ? 'border-pink-500 bg-transparent'
                          : 'border-gray-300 hover:border-pink-500'
                      }`}
                      onClick={() => handleHairToggle(hair.name)}
                    >
                      <div className="relative w-full aspect-square mb-2 rounded overflow-hidden">
                        <img
                          src={hair.image}
                          alt={hair.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(hair.name);
                          }}
                        />
                      </div>
                      <span className="text-white text-sm text-center block">{hair.name}</span>
                      <div className="text-sm text-pink-500 text-center">+{hair.price.toLocaleString('vi-VN')}₫</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Mũ</h3>
              <p className="text-sm text-white-400 mb-4">Chọn mũ – bấm để chọn/nhấn lại để bỏ chọn</p>
              <div className="grid grid-cols-4 gap-3">
                {HATS.map(hat => (
                  <div
                    key={hat.name}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.hat.includes(hat.name)
                        ? 'border-pink-500 bg-transparent'
                        : 'border-gray-300 hover:border-pink-500'
                    }`}
                    onClick={() => handleHatToggle(hat.name)}
                  >
                    <div className="relative w-full aspect-square mb-2 rounded overflow-hidden">
                      <img
                        src={hat.image}
                        alt={hat.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(hat.name);
                        }}
                      />
                    </div>
                    <span className="text-white text-sm text-center block">{hat.name}</span>
                    <div className="text-sm text-pink-500 text-center">+{hat.price.toLocaleString('vi-VN')}₫</div>
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
              <p className="text-sm text-gray-400 mb-4">Giá từ +10.000₫ - +20.000₫</p>
              <p className="text-sm text-gray-400 mb-4">(Nhấp chọn phụ kiện rồi điều chỉnh số lượng)</p>
              <div className="grid grid-cols-3 gap-3">
                {ACCESSORIES.map(acc => (
                  <div
                    key={acc.name}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.accessories.includes(acc.name)
                        ? 'border-pink-500 bg-transparent'
                        : 'border-gray-300 hover:border-pink-500'
                    }`}
                    onClick={() => handleAccessoryToggle(acc.name)}
                  >
                    <div className="relative w-full aspect-square mb-2 rounded overflow-hidden">
                      <img
                        src={acc.image}
                        alt={acc.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(acc.name);
                        }}
                      />
                    </div>
                    <div className="text-white text-sm text-center">{acc.name}</div>
                    <div className="text-sm text-pink-500 text-center">+{acc.price.toLocaleString('vi-VN')}₫</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Thú Cưng</h3>
              <p className="text-sm text-gray-400 mb-4">Giá từ +15.000₫ - +20.000₫</p>
              <p className="text-sm text-gray-400 mb-4">(Nhấp chọn thú cưng rồi điều chỉnh số lượng)</p>
              <div className="grid grid-cols-3 gap-3">
                {PETS.map(pet => (
                  <div
                    key={pet.name}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      legoConfig.pets.includes(pet.name)
                        ? 'border-pink-500 bg-transparent'
                        : 'border-gray-300 hover:border-pink-500'
                    }`}
                    onClick={() => handlePetToggle(pet.name)}
                  >
                    <div className="relative w-full aspect-square mb-2 rounded overflow-hidden">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x200/ff69b4/ffffff?text=' + encodeURIComponent(pet.name);
                        }}
                      />
                    </div>
                    <div className="text-white text-sm text-center">{pet.name}</div>
                    <div className="text-sm text-pink-500 text-center">+{pet.price.toLocaleString('vi-VN')}₫</div>
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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 max-w-md w-full text-center">
          <div className="text-pink-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-white mb-4">Đặt hàng thành công!</h1>
          <p className="text-gray-300 mb-6">
            Cảm ơn bạn đã chọn Memories Gifts để gửi gắm món quà đặc biệt!
          </p>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-6 text-left border border-gray-700">
            <p className="text-white"><strong>Tên KH:</strong> {orderInfo.name}</p>
            <p className="text-white"><strong>SĐT:</strong> {orderInfo.phone}</p>
            <p className="text-white"><strong>Địa chỉ:</strong> {orderInfo.address}</p>
            <p className="text-white"><strong>Ngày nhận:</strong> {orderInfo.deliveryDate}</p>
          </div>
          
          <p className="text-gray-300 mb-6">
            Vui lòng liên hệ với shop để xác nhận đơn hàng.
          </p>
          
          <div className="space-y-2 text-sm text-gray-300">
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
                hair: [],
                hat: [],
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
            className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
          >
            Đặt hàng mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Memories Gifts</h1>
            </div>
            <div className="text-sm text-white">
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
          <p className="text-xl text-gray-300">
            Món quà ý nghĩa cho Anniversary, Tốt nghiệp, Sinh nhật... thể hiện cá tính riêng của bạn!
          </p>
        </div>

        {/* Progress Bar for All Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Tiến độ</span>
            <span className="text-sm text-gray-400">Bước {currentStep}/5</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep/5) * 100}%` }}
            />
          </div>
          {/* Step Labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span className={currentStep >= 1 ? 'text-pink-400 font-medium' : ''}>Chọn Version</span>
            <span className={currentStep >= 2 ? 'text-pink-400 font-medium' : ''}>Background</span>
            <span className={currentStep >= 3 ? 'text-pink-400 font-medium' : ''}>Nhân Vật</span>
            <span className={currentStep >= 4 ? 'text-pink-400 font-medium' : ''}>Phụ Kiện</span>
            <span className={currentStep >= 5 ? 'text-pink-400 font-medium' : ''}>Đặt Hàng</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg transition-colors ${
              currentStep === 1
                ? 'bg-gray-600 text-white cursor-not-allowed opacity-50'
                : 'bg-gray-600 text-white hover:bg-gray-500 transition-colors'
            }`}
          >
            Quay lại
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
            >
              Tiếp theo
            </button>
          ) : (
            <button
              onClick={handleOrderSubmit}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
            >
              Đặt hàng ngay
            </button>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4 text-white">ĐƠN HÀNG CỦA BẠN</h3>
          
          <div className="space-y-2 text-sm text-white">
            <div className="flex justify-between">
              <span>Version {legoConfig.version}:</span>
              <span className="text-pink-500">{VERSIONS.find(v => v.id === legoConfig.version)?.price.toLocaleString('vi-VN')}₫</span>
            </div>
            
            {legoConfig.hair.length > 0 && (
              <div className="flex justify-between">
                <span>Tóc ({legoConfig.hair.join(', ')}):</span>
                <span className="text-pink-500">+{legoConfig.hair.reduce((sum, hair) => {
                  const maleHair = HAIRS_MALE.find(h => h.name === hair);
                  const femaleHair = HAIRS_FEMALE.find(h => h.name === hair);
                  return sum + (maleHair?.price || femaleHair?.price || 0);
                }, 0).toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            
            {legoConfig.hat.length > 0 && (
              <div className="flex justify-between">
                <span>Mũ ({legoConfig.hat.join(', ')}):</span>
                <span className="text-pink-500">+{legoConfig.hat.reduce((sum, hat) => {
                  const hatItem = HATS.find(h => h.name === hat);
                  return sum + (hatItem?.price || 0);
                }, 0).toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            
            {legoConfig.accessories.map(acc => {
              const item = ACCESSORIES.find(a => a.name === acc);
              return (
                <div key={acc} className="flex justify-between">
                  <span>Phụ kiện ({acc}):</span>
                  <span className="text-pink-500">+{item?.price.toLocaleString('vi-VN')}₫</span>
                </div>
              );
            })}
            
            {legoConfig.pets.map(pet => {
              const item = PETS.find(p => p.name === pet);
              return (
                <div key={pet} className="flex justify-between">
                  <span>Thú cưng ({pet}):</span>
                  <span className="text-pink-500">+{item?.price.toLocaleString('vi-VN')}₫</span>
                </div>
              );
            })}
            
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="flex justify-between font-semibold text-white">
                <span>Tổng cộng:</span>
                <span className="text-pink-500">{totalPrice().toLocaleString('vi-VN')}₫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="font-semibold mb-3 text-white">Chính sách bảo hành</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Hoàn tiền 70% nếu sản phẩm lỗi do shop</li>
              <li>• Nếu lỗi do bưu điện: Shop hỗ trợ 50% phí ship</li>
              <li>• Không hỗ trợ đổi trả với sản phẩm custom</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="font-semibold mb-3 text-white">Thanh toán & Giao hàng</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Thanh toán trước 100% giá trị đơn hàng</li>
              <li>• Thời gian sản xuất: 1-2 ngày</li>
              <li>• Giao hàng thường: 3-7 ngày</li>
              <li>• Giao hàng nhanh: 1-3 ngày</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="font-semibold mb-3 text-white">Liên hệ & Hỗ trợ</h4>
            <ul className="text-sm text-gray-300 space-y-1">
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
            className="bg-gray-800 rounded-lg shadow-2xl border border-pink-500 max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-600">
              <h3 className="text-xl font-semibold text-white">{modalTitle}</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-pink-500 hover:text-pink-300 text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 flex justify-center">
              <div className="relative w-full max-w-2xl">
                <img
                  src={modalImage}
                  alt={modalTitle}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  onError={(e) => {
                    if (modalFallback && modalFallback !== modalImage) {
                      e.currentTarget.src = modalFallback;
                    } else {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-600 text-center">
              <p className="text-gray-300 text-sm">
                Click bên ngoài để đóng
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

