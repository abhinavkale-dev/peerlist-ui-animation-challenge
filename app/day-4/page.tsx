'use client'

import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BackButton from "@/components/ui/BackButton";
import Breadcrumb from "@/components/ui/Breadcrumb";

type PlanType = 'free' | 'premium';
type BillingCycle = 'monthly' | 'annual';

export default function Day4() {
  const [selectedType, setSelectedType] = useState<PlanType>('free');
  const [selectedPlan, setSelectedPlan] = useState<BillingCycle>('monthly');
 
  const handleTypeChange = (type: PlanType): void => {
    setSelectedType(type);
  };
 
  const handlePlanChange = (plan: BillingCycle): void => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <Head>
        <title>Day 4: Animated Toggle | Peerlist Challenge</title>
        <meta name="description" content="An animated toggle switch challenge from Peerlist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col justify-center items-center h-screen bg-black relative">
        
        <div className="absolute top-4 right-4">
          <BackButton />
        </div>
        
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <Breadcrumb />
        </div>

        <div className="relative w-full max-w-md">
          <div className="relative flex items-center w-full h-16 bg-gray-800 rounded-full overflow-hidden">
 
            <motion.div 
              className="absolute h-16 rounded-full bg-white"
              initial={false}
              animate={{ 
                width: '50%',
                left: selectedType === 'free' ? '0%' : '50%'
              }}
              transition={{ 
                type: "spring", 
                stiffness: 180, 
                damping: 22,
                mass: 1.2
              }}
            />
            
            {selectedType === 'premium' && (
              <motion.div 
                className="absolute h-14 m-1 rounded-full bg-gray-900"
                initial={{ width: '0%' }}
                animate={{
                  width: '23%',
                  left: selectedPlan === 'monthly' ? '51%' : '76%',
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 220, 
                  damping: 24,
                  mass: 1.1
                }}
              />
            )}
            
            <button
              onClick={() => handleTypeChange('free')}
              className={`relative z-10 w-1/2 h-full flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${
                selectedType === 'free' ? 'text-black' : 'text-white'
              }`}
            >
              Free
            </button>
            
            <div className="relative z-10 w-1/2 h-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full relative">
                <motion.div 
                  className="w-full h-full flex flex-col items-center justify-center absolute inset-0"
                  animate={{ 
                    opacity: selectedType === 'free' ? 1 : 0,
                    pointerEvents: selectedType === 'free' ? 'auto' : 'none'
                  }}
                  transition={{ 
                    duration: selectedType === 'free' ? 0.3 : 0.1
                  }}
                >
                  <button
                    onClick={() => handleTypeChange('premium')}
                    className="w-full h-full flex flex-col items-center justify-center text-white"
                  >
                    <span className="font-bold text-lg mb-1">Premium</span>
                    <motion.span 
                      className="text-xs text-gray-300"
                      animate={{ 
                        scale: selectedType === 'premium' ? 1.8 : 1,
                        opacity: selectedType === 'premium' ? 0 : 1
                      }}
                      transition={{ 
                        scale: { 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20 
                        },
                        opacity: { duration: 0.3 }
                      }}
                    >
                      Monthly • Annual
                    </motion.span>
                  </button>
                </motion.div>
                
                <motion.div 
                  className="w-full h-full flex absolute inset-0"
                  initial={false}
                  animate={{ 
                    opacity: selectedType === 'premium' ? 1 : 0,
                    pointerEvents: selectedType === 'premium' ? 'auto' : 'none'
                  }}
                  transition={{ 
                    opacity: { 
                      delay: selectedType === 'premium' ? 0.2 : 0,
                      duration: 0.3 
                    }
                  }}
                >
                  <button
                    onClick={() => handlePlanChange('monthly')}
                    className={`w-1/2 h-full flex items-center justify-center font-bold text-lg ${
                      selectedPlan === 'monthly' ? 'text-white' : 'text-black'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => handlePlanChange('annual')}
                    className={`w-1/2 h-full flex items-center justify-center font-bold text-lg ${
                      selectedPlan === 'annual' ? 'text-white' : 'text-black'
                    }`}
                  >
                    Annual
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-white text-lg">
            {selectedType === 'free' ? 
              'Free Plan Selected' : 
              `Premium Plan - ${selectedPlan === 'monthly' ? 'Monthly' : 'Annual'} Billing`}
          </p>
        </div>
      </div>
    </>
  );
}
