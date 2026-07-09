import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen bg-neutral-50">
      <h1 className="text-3xl font-extrabold text-neutral-900">Eməkdaş Portalı</h1>
      <p className="text-neutral-500">Shadcn və Tailwind uğurla quraşdırıldı!</p>
      <Button variant="default" size="lg">
        Giriş et
      </Button>
    </div>
  )
}

export default App