import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>shadcn/ui is working! wow!!!! 🎉</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Click the button below to test</p>
          <Button onClick={() => alert("It works!")}>Click Me</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
