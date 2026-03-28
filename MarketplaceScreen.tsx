import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Mic, 
  ChevronLeft,
  Star,
  ShoppingCart,
  Sparkles,
  Store,
  Filter
} from 'lucide-react';

interface MarketplaceScreenProps {
  onNavigate: (screen: string) => void;
}

const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'pesticides', label: 'مبيدات' },
  { id: 'fertilizers', label: 'أسمدة' },
  { id: 'seeds', label: 'بذور' },
  { id: 'equipment', label: 'معدات' },
  { id: 'irrigation', label: 'ري' },
];

const featuredStores = [
  { id: '1', name: 'النيل للأسمدة', rating: 4.7, products: 45 },
  { id: '2', name: 'مصر للكيماويات', rating: 4.5, products: 32 },
  { id: '3', name: 'الدلتا للأسمدة', rating: 4.8, products: 28 },
];

const products = [
  {
    id: '1',
    name: 'سماد NPK متوازن 20-20-20',
    company: 'النيل للأسمدة',
    price: 85,
    rating: 4.5,
    reviews: 18,
    sales: 1204,
    aiRecommended: true,
    category: 'fertilizers',
  },
  {
    id: '2',
    name: 'مبيد حشري عضوي نيم',
    company: 'مصر للكيماويات',
    price: 120,
    rating: 4.3,
    reviews: 24,
    sales: 856,
    aiRecommended: true,
    category: 'pesticides',
  },
  {
    id: '3',
    name: 'منشط جذور للنخيل',
    company: 'الدلتا للأسمدة',
    price: 65,
    rating: 4.7,
    reviews: 15,
    sales: 623,
    aiRecommended: false,
    category: 'fertilizers',
  },
  {
    id: '4',
    name: 'بذور طماطم هجين',
    company: 'النيل للأسمدة',
    price: 45,
    rating: 4.2,
    reviews: 32,
    sales: 2100,
    aiRecommended: false,
    category: 'seeds',
  },
  {
    id: '5',
    name: 'نظام ري بالتنقيط',
    company: 'مصر للكيماويات',
    price: 350,
    rating: 4.6,
    reviews: 12,
    sales: 340,
    aiRecommended: true,
    category: 'irrigation',
  },
  {
    id: '6',
    name: 'مبيد فطري كبريت',
    company: 'الدلتا للأسمدة',
    price: 55,
    rating: 4.4,
    reviews: 28,
    sales: 980,
    aiRecommended: false,
    category: 'pesticides',
  },
];

export function MarketplaceScreen({ onNavigate }: MarketplaceScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const aiRecommendedProducts = products.filter(p => p.aiRecommended);

  return (
    <div className="min-h-screen bg-[#F8FFF8] pb-24">
      {/* Header */}
      <div 
        className="px-6 pt-12 pb-6"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)' }}
      >
        <h1 className="text-white text-2xl font-bold mb-4">🛒 سوق المنتجات</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن منتج أو مبيد أو سماد..."
            className="w-full h-14 pl-14 pr-6 bg-white rounded-full text-right focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
            dir="rtl"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2E7D32]" size={22} />
          <button className="absolute left-14 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Mic size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="px-6 mb-6">
          <div 
            className="rounded-2xl p-4"
            style={{ background: 'linear-gradient(135deg, #F9A825, #FFB300)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} className="text-[#1A1A1A]" />
              <h3 className="font-bold text-[#1A1A1A]">بناءً على أراضيك — منتجات مناسبة لك</h3>
            </div>
            
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {aiRecommendedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate(`product/${product.id}`)}
                  className="flex-shrink-0 w-40 bg-white rounded-xl p-3"
                >
                  <div className="w-full h-20 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-lg flex items-center justify-center mb-2">
                    <span className="text-3xl">📦</span>
                  </div>
                  <p className="text-xs text-[#2E7D32] mb-1">✓ يناسب أرضك</p>
                  <h4 className="font-bold text-sm">{product.name}</h4>
                  <p className="text-[#1B5E20] font-bold mt-1">{product.price} ج</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Featured Stores */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="px-6 mb-6">
          <h3 className="text-lg font-bold text-[#1B5E20] mb-3">🏪 متاجر مميزة</h3>
          
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {featuredStores.map((store) => (
              <motion.button
                key={store.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(`store/${store.id}`)}
                className="flex-shrink-0 w-44 bg-white rounded-2xl shadow-lg p-4"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#1B5E20] to-[#43A047] flex items-center justify-center text-white text-xl font-bold mb-2">
                  {store.name.charAt(0)}
                </div>
                <h4 className="font-bold text-center">{store.name}</h4>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star size={14} className="text-[#F9A825] fill-[#F9A825]" />
                  <span className="text-sm">{store.rating}</span>
                </div>
                <p className="text-gray-500 text-xs text-center mt-1">{store.products} منتج</p>
                <div className="mt-2 text-center text-[#2E7D32] text-sm font-medium">
                  زيارة المتجر →
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="px-6">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-3">
          {searchQuery ? 'نتائج البحث' : 'جميع المنتجات'}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(`product/${product.id}`)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-40 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center">
                <span className="text-5xl">📦</span>
                
                {/* Company Logo */}
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold">
                  {product.company.charAt(0)}
                </div>
                
                {/* AI Badge */}
                {product.aiRecommended && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#E8F5E9] rounded-full">
                    <span className="text-[10px] text-[#2E7D32] font-bold">✓ مناسب لمحصولك</span>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-bold text-sm line-clamp-2">{product.name}</h4>
                <p className="text-gray-500 text-xs mt-1">{product.company}</p>
                
                <div className="flex items-center gap-1 mt-2">
                  <Star size={12} className="text-[#F9A825] fill-[#F9A825]" />
                  <span className="text-xs">{product.rating}</span>
                  <span className="text-gray-400 text-xs">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <p className="text-[#1B5E20] font-bold text-lg">{product.price} ج</p>
                  <p className="text-gray-400 text-xs">{product.sales.toLocaleString()} مبيعة</p>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCartCount(cartCount + 1);
                  }}
                  className="w-full mt-3 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
                >
                  اشتري
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(`store/${product.company}`);
                  }}
                  className="w-full mt-2 text-gray-500 text-xs hover:text-[#2E7D32]"
                >
                  عرض المتجر
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sticky Bottom */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-20 left-6 right-6 z-40"
        >
          <button 
            onClick={() => onNavigate('cart')}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-between px-6"
            style={{ background: 'linear-gradient(135deg, #F9A825, #FFB300)' }}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart size={24} />
              <span>السلة ({cartCount} منتج)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>إجمالي 170 ج</span>
              <ChevronLeft size={20} />
            </div>
          </button>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom z-30">
        <div className="flex justify-around items-center h-18 py-2">
          {[
            { id: 'home', icon: Store, label: 'الرئيسية' },
            { id: 'marketplace', icon: ShoppingCart, label: 'السوق' },
            { id: 'orders', icon: Filter, label: 'طلباتي' },
            { id: 'profile', icon: Star, label: 'حسابي' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl ${
                tab.id === 'marketplace' ? 'text-[#1B5E20]' : 'text-gray-400'
              }`}
            >
              <tab.icon size={22} />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
