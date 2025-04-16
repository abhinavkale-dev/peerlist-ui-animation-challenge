'use client'

import { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { List, Grid, Package, LucideProps } from 'lucide-react';
import BackButton from "@/components/ui/BackButton";
import Breadcrumb from "@/components/ui/Breadcrumb";

const collectibles = [
  {
    id: 1,
    name: 'Skilled Fingers Series',
    price: '0.855 ETH',
    number: '#209',
    image: 'https://pro.bossadizenith.me/first.svg',
  },
  {
    id: 2,
    name: 'Vibrant Vibes Series',
    price: '0.209 ETH',
    number: '#808',
    image: 'https://pro.bossadizenith.me/second.svg',
  },
];


interface ViewButtonProps {
  icon: React.ComponentType<LucideProps>;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}


const ViewButton = ({ icon: Icon, label, isSelected, onClick }: ViewButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${
      isSelected
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </motion.button>
);


interface SharedItemProps {
  item: {
    id: number;
    name: string;
    price: string;
    number: string;
    image: string;
  };
  viewMode: 'list' | 'card' | 'pack';
  isLast: boolean;
}


const SharedItem = ({ item, viewMode, isLast }: SharedItemProps) => {
  const containerClass = {
    list: 'flex items-center gap-6 p-6',
    card: 'p-6',
    pack: 'absolute',
  };

  const imageClass = {
    list: 'w-20 h-20 rounded-xl object-cover',
    card: 'w-full h-48 mb-4 rounded-xl object-cover',
    pack: 'w-full h-full object-cover rounded-xl',
  };

  return (
    <motion.div
      layout
      layoutId={`container-${item.id}`}
      className={containerClass[viewMode]}
      initial={{ borderRadius: 16 }}
      animate={{ borderRadius: 16 }}
      style={{
        backgroundColor: 'white',
        overflow: 'hidden',
        ...(viewMode === 'pack' && {
          position: 'absolute',
          top: isLast ? 12 : 0,
          left: isLast ? 12 : 0,
          width: '100%',
          height: '100%',
          zIndex: isLast ? 10 : 0,
        }),
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 180,
        duration: 0.35,
      }}
    >
      <motion.img
        layoutId={`image-${item.id}`}
        src={item.image}
        alt={item.name}
        className={imageClass[viewMode]}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 180,
          duration: 0.35,
        }}
      />

      {viewMode !== 'pack' && (
        <motion.div 
          layoutId={`content-${item.id}`} 
          className={viewMode === 'list' ? 'flex-1' : ''}
          transition={{
            layout: { duration: 0.35, type: "spring", damping: 30, stiffness: 180 }
          }}
        >
          <motion.h3 layout className="text-xl font-semibold mb-2 text-gray-900 dark:text-white" transition={{ layout: { duration: 0.3 } }}>
            {item.name}
          </motion.h3>
          <motion.div layout className="flex items-center justify-between" transition={{ layout: { duration: 0.3 } }}>
            <motion.span layout className="text-lg font-medium text-blue-600 dark:text-blue-400" transition={{ layout: { duration: 0.3 } }}>
              {item.price}
            </motion.span>
            <motion.span layout className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm" transition={{ layout: { duration: 0.3 } }}>
              {item.number}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};


export default function App() {
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'pack'>('list');

  const containerClasses = {
    list: 'space-y-4 max-w-2xl',
    card: 'grid grid-cols-2 gap-8 max-w-3xl',
    pack: 'flex justify-center items-center',
  };

  const totalPrice = collectibles
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 relative">
      <div className="absolute top-4 right-4">
        <BackButton />
      </div>
      
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <Breadcrumb />
      </div>
      
      <div className="max-w-4xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >

            <h2 className="text-2xl text-gray-700 dark:text-gray-300">Day 5: Shared Layout Tabs</h2>
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8 text-center">Collectibles</h3>

        <div className="flex justify-center gap-4 mb-12">
          <ViewButton
            icon={List}
            label="List view"
            isSelected={viewMode === 'list'}
            onClick={() => setViewMode('list')}
          />
          <ViewButton
            icon={Grid}
            label="Card view"
            isSelected={viewMode === 'card'}
            onClick={() => setViewMode('card')}
          />
          <ViewButton
            icon={Package}
            label="Pack view"
            isSelected={viewMode === 'pack'}
            onClick={() => setViewMode('pack')}
          />
        </div>

  
        <AnimatePresence>
          <LayoutGroup>
            <motion.div 
              layout 
              className={`${containerClasses[viewMode]} mx-auto`}
              transition={{
                layout: { duration: 0.35, type: "spring", damping: 30, stiffness: 180 }
              }}
            >
              {viewMode === 'pack' ? (
                <motion.div 
                  layout 
                  className="relative w-48 h-48"
                  transition={{
                    layout: { duration: 0.35, type: "spring", damping: 30, stiffness: 180 }
                  }}
                >
                  {collectibles.map((item, index) => (
                    <SharedItem
                      key={item.id}
                      item={item}
                      viewMode="pack"
                      isLast={index === collectibles.length - 1}
                    />
                  ))}
                  <motion.div 
                    layout 
                    className="absolute top-full left-0 right-0 text-center mt-6"
                    transition={{
                      layout: { duration: 0.35, type: "spring", damping: 30, stiffness: 180 }
                    }}
                  >
                    <motion.h3 layout className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {collectibles.length} Collectibles
                    </motion.h3>
                    <motion.p layout className="text-xl font-medium text-blue-600 dark:text-blue-400">
                      {totalPrice} ETH
                    </motion.p>
                  </motion.div>
                </motion.div>
              ) : (
                collectibles.map((item) => (
                  <SharedItem
                    key={item.id}
                    item={item}
                    viewMode={viewMode}
                    isLast={false}
                  />
                ))
              )}
            </motion.div>
          </LayoutGroup>
        </AnimatePresence>
      </div>
    </div>
  );
}