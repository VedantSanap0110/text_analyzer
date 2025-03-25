import React, { useState } from 'react';
import { AlertCircle, Users, Utensils, Calendar, CloudSun, AlertTriangle, Coffee, UtensilsCrossed, Sun, Cloud, Umbrella, Home, Users as UsersIcon } from 'lucide-react';

function OrderFood() {
  // Booking statistics state
  const [bookingStats] = useState({
    breakfast: 45,
    lunch: 78,
    snacks: 30,
    dinner: 52
  });

  // AI Prediction form state
  const [predictionForm, setPredictionForm] = useState({
    weatherCondition: 'sunny', // sunny, rainy, cloudy
    wfhProbability: 20, // percentage
    isReligiousHoliday: false,
    fastingProbability: 10, // percentage
    baselineAttendance: 200,
    specialEventAttendees: 0
  });

  // Direct order form state
  const [directOrder, setDirectOrder] = useState({
    mealType: 'lunch',
    quantity: 100,
    dietaryPreferences: {
      veg: true,
      nonVeg: true,
      fasting: false
    }
  });

  // Predicted plates state
  const [predictedPlates, setPredictedPlates] = useState<number | null>(null);

  const alerts = [
    { type: 'holiday', message: 'Holi Festival - March 25th', icon: Calendar },
    { type: 'weather', message: 'Heavy Rain Expected - Plan accordingly', icon: CloudSun },
    { type: 'event', message: 'Annual Meeting - March 28th', icon: Users },
    { type: 'misc', message: 'Local Elections - Expect increased staff', icon: AlertCircle },
  ];

  // Handle prediction form changes
  const handlePredictionChange = (field: string, value: string | number | boolean) => {
    setPredictionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle direct order form changes
  const handleDirectOrderChange = (field: string, value: string | number) => {
    setDirectOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // AI Prediction logic (mock)
  const predictOrderQuantity = () => {
    // Mock AI prediction calculation
    const baseAttendance = predictionForm.baselineAttendance;
    const wfhImpact = baseAttendance * (predictionForm.wfhProbability / 100);
    const weatherImpact = predictionForm.weatherCondition === 'rainy' ? -20 : 0;
    const holidayImpact = predictionForm.isReligiousHoliday ? -40 : 0;
    const fastingImpact = baseAttendance * (predictionForm.fastingProbability / 100);
    
    const predicted = Math.round(
      baseAttendance - wfhImpact + weatherImpact - holidayImpact - fastingImpact + predictionForm.specialEventAttendees
    );
    
    setPredictedPlates(Math.max(0, predicted));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Food Order Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Alerts Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Alerts & Notifications
              </h2>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                    <alert.icon className="w-5 h-5 text-blue-600 mt-1" />
                    <p className="text-gray-700">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Statistics Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Today's Bookings
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-purple-600" />
                    <span>Breakfast</span>
                  </div>
                  <span className="font-semibold text-purple-600">{bookingStats.breakfast}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-blue-600" />
                    <span>Lunch</span>
                  </div>
                  <span className="font-semibold text-blue-600">{bookingStats.lunch}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-green-600" />
                    <span>Snacks</span>
                  </div>
                  <span className="font-semibold text-green-600">{bookingStats.snacks}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-orange-600" />
                    <span>Dinner</span>
                  </div>
                  <span className="font-semibold text-orange-600">{bookingStats.dinner}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* AI Prediction Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-indigo-600" />
                AI-Powered Order Prediction
              </h2>

              <div className="space-y-6">
                {/* Weather Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weather Condition</label>
                  <div className="flex gap-4">
                    {['sunny', 'rainy', 'cloudy'].map((weather) => (
                      <button
                        key={weather}
                        onClick={() => handlePredictionChange('weatherCondition', weather)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                          predictionForm.weatherCondition === weather
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {weather === 'sunny' && <Sun className="w-4 h-4" />}
                        {weather === 'rainy' && <Umbrella className="w-4 h-4" />}
                        {weather === 'cloudy' && <Cloud className="w-4 h-4" />}
                        {weather.charAt(0).toUpperCase() + weather.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WFH Probability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WFH Probability (%)
                  </label>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-500" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={predictionForm.wfhProbability}
                      onChange={(e) => handlePredictionChange('wfhProbability', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="w-12 text-right">{predictionForm.wfhProbability}%</span>
                  </div>
                </div>

                {/* Religious Holiday */}
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={predictionForm.isReligiousHoliday}
                      onChange={(e) => handlePredictionChange('isReligiousHoliday', e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Religious Holiday</span>
                  </label>
                </div>

                {/* Fasting Probability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fasting Probability (%)
                  </label>
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-gray-500" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={predictionForm.fastingProbability}
                      onChange={(e) => handlePredictionChange('fastingProbability', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="w-12 text-right">{predictionForm.fastingProbability}%</span>
                  </div>
                </div>

                {/* Baseline Attendance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Baseline Attendance
                  </label>
                  <input
                    type="number"
                    value={predictionForm.baselineAttendance}
                    onChange={(e) => handlePredictionChange('baselineAttendance', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                  />
                </div>

                {/* Special Event Attendees */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Special Event Attendees
                  </label>
                  <input
                    type="number"
                    value={predictionForm.specialEventAttendees}
                    onChange={(e) => handlePredictionChange('specialEventAttendees', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                  />
                </div>

                <button
                  onClick={predictOrderQuantity}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Predict Order Quantity
                </button>

                {predictedPlates !== null && (
                  <div className="p-4 bg-green-50 rounded-md">
                    <h3 className="font-semibold text-green-800">AI Prediction Result</h3>
                    <p className="text-green-700">
                      Recommended order quantity: <span className="font-bold">{predictedPlates}</span> plates
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Order Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-green-600" />
                Direct Order
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                  <select
                    value={directOrder.mealType}
                    onChange={(e) => handleDirectOrderChange('mealType', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="snacks">Snacks</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={directOrder.quantity}
                    onChange={(e) => handleDirectOrderChange('quantity', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={directOrder.dietaryPreferences.veg}
                        onChange={(e) => setDirectOrder(prev => ({
                          ...prev,
                          dietaryPreferences: { ...prev.dietaryPreferences, veg: e.target.checked }
                        }))}
                        className="rounded text-green-600"
                      />
                      <span>Vegetarian</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={directOrder.dietaryPreferences.nonVeg}
                        onChange={(e) => setDirectOrder(prev => ({
                          ...prev,
                          dietaryPreferences: { ...prev.dietaryPreferences, nonVeg: e.target.checked }
                        }))}
                        className="rounded text-red-600"
                      />
                      <span>Non-Vegetarian</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={directOrder.dietaryPreferences.fasting}
                        onChange={(e) => setDirectOrder(prev => ({
                          ...prev,
                          dietaryPreferences: { ...prev.dietaryPreferences, fasting: e.target.checked }
                        }))}
                        className="rounded text-purple-600"
                      />
                      <span>Fasting</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => alert('Order placed successfully!')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFood;