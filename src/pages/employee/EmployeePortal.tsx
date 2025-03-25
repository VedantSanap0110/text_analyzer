import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Star, MessageSquare, Users } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  type: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  available: boolean;
}

interface FeedbackItem {
  date: string;
  mealType: string;
  qualityRating: number;
  preferenceRating: number;
  suggestions: string;
}

interface BookingStats {
  breakfast: number;
  lunch: number;
  snacks: number;
  dinner: number;
}

function EmployeePortal() {
  const [currentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'order' | 'feedback'>('order');
  const [selectedMeal, setSelectedMeal] = useState<string>('');
  const [feedback, setFeedback] = useState<FeedbackItem>({
    date: new Date().toISOString().split('T')[0],
    mealType: '',
    qualityRating: 0,
    preferenceRating: 0,
    suggestions: ''
  });

  // Mock booking statistics
  const [bookingStats] = useState<BookingStats>({
    breakfast: 45,
    lunch: 78,
    snacks: 30,
    dinner: 52
  });

  // Mock today's menu data
  const todaysMenu: MenuItem[] = [
    {
      id: 1,
      name: 'Masala Dosa with Sambar',
      description: 'South Indian crispy crepe with lentil soup',
      type: 'breakfast',
      available: currentTime.getHours() < 8
    },
    {
      id: 2,
      name: 'Butter Chicken with Naan',
      description: 'Creamy chicken curry with Indian bread',
      type: 'lunch',
      available: currentTime.getHours() < 11
    },
    {
      id: 3,
      name: 'Samosa with Chai',
      description: 'Crispy pastry with spiced potato filling',
      type: 'snacks',
      available: currentTime.getHours() < 16
    },
    {
      id: 4,
      name: 'Paneer Tikka Masala',
      description: 'Grilled cottage cheese in spicy gravy',
      type: 'dinner',
      available: currentTime.getHours() < 19
    }
  ];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    alert('Order placed successfully!');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Booking Statistics Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Users className="text-blue-500" />
                Today's Bookings
              </h2>
              <div className="space-y-4">
                {Object.entries(bookingStats).map(([meal, count]) => (
                  <div
                    key={meal}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="capitalize text-gray-700">{meal}</span>
                    <span className="font-semibold text-blue-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === 'order'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('order')}
                >
                  <UtensilsCrossed className="inline-block mr-2" size={20} />
                  Place Order
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === 'feedback'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('feedback')}
                >
                  <Star className="inline-block mr-2" size={20} />
                  Feedback
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'order' ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Today's Menu</h2>
                    <div className="space-y-6">
                      {todaysMenu.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 border rounded-lg ${
                            item.available
                              ? 'bg-white'
                              : 'bg-gray-100 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{item.name}</h3>
                              <p className="text-gray-600">{item.description}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </p>
                            </div>
                            <button
                              className={`px-4 py-2 rounded-md ${
                                item.available
                                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                              disabled={!item.available}
                              onClick={() => setSelectedMeal(item.name)}
                            >
                              {item.available ? 'Order Now' : 'Unavailable'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Yesterday's Food Feedback</h2>
                    <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Select Meal
                        </label>
                        <select
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={feedback.mealType}
                          onChange={(e) =>
                            setFeedback({ ...feedback, mealType: e.target.value })
                          }
                        >
                          <option value="">Select a meal</option>
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="snacks">Snacks</option>
                          <option value="dinner">Dinner</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Food Quality Rating
                        </label>
                        <div className="flex gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              className={`p-2 rounded-full ${
                                feedback.qualityRating === rating
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200'
                              }`}
                              onClick={() =>
                                setFeedback({ ...feedback, qualityRating: rating })
                              }
                            >
                              <Star size={20} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Preference Rating
                        </label>
                        <div className="flex gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              className={`p-2 rounded-full ${
                                feedback.preferenceRating === rating
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200'
                              }`}
                              onClick={() =>
                                setFeedback({ ...feedback, preferenceRating: rating })
                              }
                            >
                              <Star size={20} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Suggestions
                        </label>
                        <textarea
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          rows={4}
                          value={feedback.suggestions}
                          onChange={(e) =>
                            setFeedback({ ...feedback, suggestions: e.target.value })
                          }
                          placeholder="Share your thoughts and suggestions..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Submit Feedback
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePortal;