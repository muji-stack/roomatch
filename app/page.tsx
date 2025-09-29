export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">
          🏠 RoomMatch
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          物件 × インテリアの新しい出会い
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            開発スタート!
          </h2>
          <p className="text-gray-600">
            あなたの理想の住まい探しを、<br />
            インテリアと一緒に実現します
          </p>
        </div>
      </div>
    </div>
  );
}