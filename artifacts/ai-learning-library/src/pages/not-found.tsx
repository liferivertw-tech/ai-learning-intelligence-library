import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              找不到這個頁面
            </h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            此網址不在目前的學習圖書館中，請回到書架重新選課。
          </p>
          <Link href="/" className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-primary-foreground">回到書架</Link>
        </CardContent>
      </Card>
    </div>
  );
}
