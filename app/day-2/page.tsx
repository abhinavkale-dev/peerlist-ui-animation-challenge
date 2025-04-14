import StatusIndicator from "@/components/challenge/StatusIndicator";
import BackButton from "@/components/ui/BackButton";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function TransactionStatusPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 relative">
      <div className="absolute top-4 right-4">
        <BackButton />
      </div>
      
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <Breadcrumb />
      </div>
      
      <h1 className="text-2xl font-bold mb-3 text-white">Day 2: Dynamic Status Indicator</h1>
      <p className="text-sm mb-9 text-gray-400">(Wait 3 seconds for each animation cycle)</p>
      <div className="mb-8">
        <StatusIndicator />
      </div>
    </div>
  );
}