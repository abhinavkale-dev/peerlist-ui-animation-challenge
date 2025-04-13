import StatusIndicator from "@/components/challenge/StatusIndicator";
import BackButton from "@/components/ui/BackButton";

export default function TransactionStatusPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 relative">
      <div className="absolute top-4 right-4">
        <BackButton />
      </div>
      
      <h1 className="text-2xl font-bold mb-3">Dynamic Status Indicator</h1>
      <p className="text-sm mb-9">(Wait 3 seconds for each animation cycle)</p>
      <div className="mb-8">
        <StatusIndicator />
      </div>
    </div>
  );
}