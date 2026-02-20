import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// Main App Navigator Component with Safe Area
const MainAppNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#16a34a',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            height: 60 + insets.bottom,
            paddingBottom: Math.max(insets.bottom, 8),
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontFamily: 'Montserrat',
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size || 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Eco Quest"
          component={ChallengesScreen}
          options={{
            tabBarLabel: 'Eco Quest',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="refresh-circle" size={size || 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Energy"
          component={EnergyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flash" size={size || 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="gift" size={size || 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size || 24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// ==================== MAIN APP SCREENS ====================

// Home Screen Component
const HomeScreen: React.FC = () => {
  const stats = [
    { id: '1', icon: 'leaf', value: '245', unit: 'kWh', label: 'Energy Saved', color: '#10b981', gradient: ['#d1fae5', '#a7f3d0'] },
    { id: '2', icon: 'trash', value: '1.2', unit: 'kg', label: 'Waste Diverted', color: '#059669', gradient: ['#a7f3d0', '#86efac'] },
    { id: '3', icon: 'earth', value: '89', unit: 'kg', label: 'CO₂ Reduced', color: '#16a34a', gradient: ['#bbf7d0', '#d1fae5'] },
  ];

  const recentActivity = [
    { id: '1', user: 'Sarah M.', action: 'completed a challenge', time: '2h ago', points: 50 },
    { id: '2', user: 'John D.', action: 'earned a new badge', time: '5h ago', points: 100 },
    { id: '3', user: 'Emma K.', action: 'reached a milestone', time: '1d ago', points: 75 },
  ];

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={homeStyles.scrollView}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Gradient */}
        <View style={homeStyles.heroSection}>
          <View style={homeStyles.heroContent}>
            <View style={homeStyles.heroTop}>
              <View>
                <Text style={homeStyles.heroGreeting}>Welcome back,</Text>
                <Text style={homeStyles.heroName}>Ndahiro! 👋</Text>
              </View>
              <TouchableOpacity style={homeStyles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#ffffff" />
                <View style={homeStyles.notificationBadge} />
              </TouchableOpacity>
            </View>

            {/* Points Card */}
            <View style={homeStyles.pointsCard}>
              <View style={homeStyles.pointsCardHeader}>
                <View>
                  <Text style={homeStyles.pointsLabel}>Your Points</Text>
                  <Text style={homeStyles.pointsValue}>2,450</Text>
                </View>
                <View style={homeStyles.pointsIconContainer}>
                  <Ionicons name="star" size={32} color="#fbbf24" />
                </View>
              </View>
              <View style={homeStyles.rankInfo}>
                <Ionicons name="trophy" size={16} color="#16a34a" />
                <Text style={homeStyles.rankText}>Rank #12 • Rwanda Coding Academy</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={homeStyles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.id} style={[homeStyles.statCard, { borderLeftColor: stat.color }]}>
              <View style={[homeStyles.statIconWrapper, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <View style={homeStyles.statContent}>
                <Text style={[homeStyles.statValue, { color: stat.color }]}>
                  {stat.value} {stat.unit}
                </Text>
                <Text style={homeStyles.statLabel}>{stat.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Active Challenge Section */}
        <View style={homeStyles.challengeSection}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Active Challenge</Text>
            <TouchableOpacity>
              <Text style={homeStyles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.challengeCard}>
            <View style={homeStyles.challengeCardHeader}>
              <View style={homeStyles.challengeBadge}>
                <Ionicons name="flame" size={20} color="#f59e0b" />
                <Text style={homeStyles.challengeBadgeText}>Active</Text>
              </View>
              <Ionicons name="trophy" size={28} color="#fbbf24" />
            </View>
            <Text style={homeStyles.challengeTitle}>Plastic-Free Week Challenge</Text>
            <Text style={homeStyles.challengeDescription}>
              Reduce plastic usage and earn bonus points
            </Text>
            <View style={homeStyles.progressSection}>
              <View style={homeStyles.progressHeader}>
                <Text style={homeStyles.progressLabel}>Progress</Text>
                <Text style={homeStyles.progressPercent}>65%</Text>
              </View>
              <View style={homeStyles.progressBar}>
                <View style={[homeStyles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={homeStyles.progressTime}>3 days remaining</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={homeStyles.quickActionsSection}>
          <Text style={homeStyles.sectionTitle}>Quick Actions</Text>
          <View style={homeStyles.quickActionsGrid}>
            <TouchableOpacity style={[homeStyles.quickActionCard, { backgroundColor: '#f0fdf4' }]}>
              <View style={[homeStyles.quickActionIcon, { backgroundColor: '#16a34a' }]}>
                <Ionicons name="add-circle" size={28} color="#ffffff" />
              </View>
              <Text style={homeStyles.quickActionLabel}>Post Action</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.quickActionCard, { backgroundColor: '#fffbeb' }]}>
              <View style={[homeStyles.quickActionIcon, { backgroundColor: '#f59e0b' }]}>
                <Ionicons name="gift" size={28} color="#ffffff" />
              </View>
              <Text style={homeStyles.quickActionLabel}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.quickActionCard, { backgroundColor: '#eff6ff' }]}>
              <View style={[homeStyles.quickActionIcon, { backgroundColor: '#3b82f6' }]}>
                <Ionicons name="people" size={28} color="#ffffff" />
              </View>
              <Text style={homeStyles.quickActionLabel}>Community</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.quickActionCard, { backgroundColor: '#f5f3ff' }]}>
              <View style={[homeStyles.quickActionIcon, { backgroundColor: '#8b5cf6' }]}>
                <Ionicons name="stats-chart" size={28} color="#ffffff" />
              </View>
              <Text style={homeStyles.quickActionLabel}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={homeStyles.activitySection}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={homeStyles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={homeStyles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={homeStyles.activityItem}>
                <View style={homeStyles.activityAvatar}>
                  <Ionicons name="person" size={20} color="#6b7280" />
                </View>
                <View style={homeStyles.activityContent}>
                  <Text style={homeStyles.activityText}>
                    <Text style={homeStyles.activityUser}>{activity.user}</Text> {activity.action}
                  </Text>
                  <Text style={homeStyles.activityTime}>{activity.time}</Text>
                </View>
                <View style={homeStyles.activityPoints}>
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text style={homeStyles.activityPointsText}>+{activity.points}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Eco Quest Screen Component (Youth-focused waste impact reporting)
const ChallengesScreen: React.FC = () => {
  const TEST_USER_NAME = 'Ndahiro'; // Test user for simulation
  const [activeFilter, setActiveFilter] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Request permissions on mount
  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
        // Permissions not granted, but continue anyway (user can grant later)
      }
    })();
  }, []);

  const pickImage = async (source: 'camera' | 'library') => {
    try {
      let result;
      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const showImagePickerOptions = () => {
    if (Platform.OS === 'ios') {
      const { ActionSheetIOS } = require('react-native');
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        (buttonIndex: number) => {
          if (buttonIndex === 1) {
            pickImage('camera');
          } else if (buttonIndex === 2) {
            pickImage('library');
          }
        },
      );
    } else {
      // Android - show custom modal
      setShowImagePickerModal(true);
    }
  };

  const analysisSteps = [
    { message: 'Uploading your image...', progress: 10 },
    { message: 'AI analyzing image content...', progress: 25 },
    { message: 'Detecting waste types...', progress: 45 },
    { message: 'Classifying scene (cleanup/sorting/reduction)...', progress: 65 },
    { message: 'Calculating environmental impact...', progress: 80 },
    { message: 'Verifying authenticity...', progress: 95 },
    { message: 'Finalizing score...', progress: 100 },
  ];

  React.useEffect(() => {
    if (isAnalyzing) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isAnalyzing]);

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisProgress(0);
    setShowPostModal(false);

    // Simulate step-by-step analysis
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < analysisSteps.length) {
        setAnalysisMessage(analysisSteps[currentStep].message);
        setAnalysisProgress(analysisSteps[currentStep].progress);
        setAnalysisStep(currentStep);
        currentStep++;
      } else {
        clearInterval(stepInterval);
        // After analysis, show result
        setTimeout(() => {
          setIsAnalyzing(false);
          // Simulate AI scoring
          const confidenceScore = 0.92; // High confidence for auto-approval
          const estimatedPoints = Math.floor(Math.random() * 50) + 50; // 50-100 points
          
          if (confidenceScore >= 0.85) {
            // Auto-approve
            const newPost = {
              id: Date.now().toString(),
              userName: TEST_USER_NAME,
              userImage: null,
              image: selectedImage ? { uri: selectedImage } : require('./assets/firstImage.png'),
              description: postDescription,
              status: 'verified',
              points: estimatedPoints,
              time: 'Just now',
              category: selectedCategory || 'Waste Cleanup',
            };
            
            setPosts((prev) => [newPost, ...prev]);
            setPostDescription('');
            setSelectedCategory('');
            setSelectedImage(null);
            
            // Show success message
            alert(`✅ Verified! +${estimatedPoints} points\n\nYour eco action has been automatically approved by AI!`);
          } else {
            // Send to manual review
            const newPost = {
              id: Date.now().toString(),
              userName: TEST_USER_NAME,
              userImage: null,
              image: selectedImage ? { uri: selectedImage } : require('./assets/firstImage.png'),
              description: postDescription,
              status: 'pending',
              points: 0,
              time: 'Just now',
              category: selectedCategory || 'Waste Cleanup',
            };
            
            setPosts((prev) => [newPost, ...prev]);
            setPostDescription('');
            setSelectedCategory('');
            setSelectedImage(null);
            
            alert('⏳ Pending Review\n\nYour post is being reviewed by our team. You\'ll get points once approved!');
          }
        }, 1000);
      }
    }, 800); // Each step takes 800ms
  };
  const [posts, setPosts] = useState([
    {
      id: '1',
      userName: 'Sarah M.',
      userImage: null,
      image: require('./assets/firstImage.png'),
      description: 'Just switched to reusable bags! Every small action counts 🌱',
      status: 'verified',
      points: 50,
      time: '2h ago',
      category: 'Waste Reduction',
    },
    {
      id: '2',
      userName: 'John D.',
      userImage: null,
      image: require('./assets/secondImage.png'),
      description: 'Planted 5 trees in my neighborhood today!',
      status: 'verified',
      points: 100,
      time: '5h ago',
      category: 'Community Cleanup',
    },
    {
      id: '3',
      userName: 'Emma K.',
      userImage: null,
      image: require('./assets/thirdimage.png'),
      description: 'Started composting at home',
      status: 'pending',
      points: 0,
      time: '1d ago',
      category: 'Waste Sorting',
    },
  ]);

  const filters = ['All', 'My Posts', 'Trending', 'District'];
  const challengeCategories = [
    'Waste Cleanup',
    'Waste Sorting',
    'Waste Reduction',
    'Community Cleanup',
    'Recycling',
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'verified') {
      return (
        <View style={challengesStyles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
          <Text style={challengesStyles.verifiedText}>Verified</Text>
        </View>
      );
    }
    return (
      <View style={challengesStyles.pendingBadge}>
        <Ionicons name="time" size={16} color="#f59e0b" />
        <Text style={challengesStyles.pendingText}>Pending Review</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={challengesStyles.container}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={challengesStyles.header}>
        <View>
          <Text style={challengesStyles.headerTitle}>Eco Quest</Text>
          <Text style={challengesStyles.headerSubtitle}>Share your impact, earn rewards!</Text>
        </View>
        <TouchableOpacity
          style={challengesStyles.postButton}
          onPress={() => setShowPostModal(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={20} color="#ffffff" />
          <Text style={challengesStyles.postButtonText}>Post Action</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={challengesStyles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={challengesStyles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                challengesStyles.filterTab,
                activeFilter === filter && challengesStyles.filterTabActive,
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  challengesStyles.filterText,
                  activeFilter === filter && challengesStyles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      <ScrollView
        style={challengesStyles.feed}
        contentContainerStyle={challengesStyles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {(() => {
          const filteredPosts =
            activeFilter === 'My Posts'
              ? posts.filter((post) => post.userName === TEST_USER_NAME)
              : activeFilter === 'Trending'
              ? posts.filter((post) => post.status === 'verified' && post.points >= 75)
              : activeFilter === 'District'
              ? posts // In real app, would filter by district
              : posts;

          if (filteredPosts.length === 0) {
            return (
              <View style={challengesStyles.emptyState}>
                <Ionicons name="leaf-outline" size={64} color="#d1d5db" />
                <Text style={challengesStyles.emptyTitle}>
                  {activeFilter === 'My Posts' ? 'No posts yet' : 'No posts found'}
                </Text>
                <Text style={challengesStyles.emptySubtitle}>
                  {activeFilter === 'My Posts'
                    ? 'Post your first eco action to get started!'
                    : 'Be the first to post an eco action!'}
                </Text>
              </View>
            );
          }

          return filteredPosts.map((post) => (
            <View key={post.id} style={challengesStyles.postCard}>
              {/* User Info */}
              <View style={challengesStyles.postHeader}>
                <View style={challengesStyles.userAvatar}>
                  <Ionicons name="person" size={24} color="#6b7280" />
                </View>
                <View style={challengesStyles.userInfo}>
                  <Text style={challengesStyles.userName}>{post.userName}</Text>
                  <Text style={challengesStyles.postTime}>{post.time}</Text>
                </View>
                {getStatusBadge(post.status)}
              </View>

              {/* Post Image */}
              <Image
                source={typeof post.image === 'object' && 'uri' in post.image ? post.image : post.image}
                style={challengesStyles.postImage}
                resizeMode="cover"
              />

              {/* Post Description */}
              <Text style={challengesStyles.postDescription}>{post.description}</Text>

              {/* Category & Points */}
              <View style={challengesStyles.postFooter}>
                {post.category && (
                  <View style={challengesStyles.categoryBadge}>
                    <Ionicons name="pricetag" size={14} color="#6b7280" />
                    <Text style={challengesStyles.categoryBadgeText}>{post.category}</Text>
                  </View>
                )}
                {post.status === 'verified' && (
                  <View style={challengesStyles.pointsContainer}>
                    <Ionicons name="star" size={18} color="#fbbf24" />
                    <Text style={challengesStyles.pointsText}>+{post.points} points</Text>
                  </View>
                )}
              </View>
            </View>
          ));
        })()}
      </ScrollView>

      {/* Post Creation Modal */}
      {showPostModal && !isAnalyzing && (
        <View style={challengesStyles.modalOverlay}>
          <View style={challengesStyles.modalContent}>
            <View style={challengesStyles.modalHeader}>
              <Text style={challengesStyles.modalTitle}>Create Eco Impact Post</Text>
              <TouchableOpacity onPress={() => setShowPostModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Image Upload Area */}
            <TouchableOpacity
              style={challengesStyles.imageUploadArea}
              onPress={showImagePickerOptions}
            >
              {selectedImage ? (
                <>
                  <Image source={{ uri: selectedImage }} style={challengesStyles.previewImage} resizeMode="cover" />
                  <TouchableOpacity
                    style={challengesStyles.removeImageButton}
                    onPress={() => setSelectedImage(null)}
                  >
                    <Ionicons name="close-circle" size={24} color="#ef4444" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Ionicons name="camera" size={48} color="#9ca3af" />
                  <Text style={challengesStyles.imageUploadText}>Tap to add photo</Text>
                  <Text style={challengesStyles.imageUploadHint}>
                    Camera or Photo Library
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Description Input */}
            <View style={challengesStyles.inputSection}>
              <Text style={challengesStyles.inputLabel}>What did you do?</Text>
              <TextInput
                style={challengesStyles.descriptionInput}
                placeholder="Describe your eco action..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                value={postDescription}
                onChangeText={setPostDescription}
              />
            </View>

            {/* Category Selection */}
            <View style={challengesStyles.inputSection}>
              <Text style={challengesStyles.inputLabel}>Challenge Category (Optional)</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={challengesStyles.categoriesContainer}
              >
                {challengeCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      challengesStyles.categoryChip,
                      selectedCategory === category && challengesStyles.categoryChipActive,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        challengesStyles.categoryText,
                        selectedCategory === category && challengesStyles.categoryTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                challengesStyles.modalButton,
                (!postDescription.trim() && { opacity: 0.5 }),
              ]}
              onPress={() => {
                if (postDescription.trim()) {
                  simulateAIAnalysis();
                }
              }}
              disabled={!postDescription.trim()}
            >
              <Text style={challengesStyles.modalButtonText}>Submit for AI Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Image Picker Options Modal (Android) */}
      {showImagePickerModal && (
        <View style={challengesStyles.modalOverlay}>
          <View style={challengesStyles.imagePickerModal}>
            <View style={challengesStyles.modalHeader}>
              <Text style={challengesStyles.modalTitle}>Select Image Source</Text>
              <TouchableOpacity onPress={() => setShowImagePickerModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={challengesStyles.imagePickerOption}
              onPress={() => {
                setShowImagePickerModal(false);
                pickImage('camera');
              }}
            >
              <Ionicons name="camera" size={32} color="#16a34a" />
              <Text style={challengesStyles.imagePickerOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={challengesStyles.imagePickerOption}
              onPress={() => {
                setShowImagePickerModal(false);
                pickImage('library');
              }}
            >
              <Ionicons name="images" size={32} color="#16a34a" />
              <Text style={challengesStyles.imagePickerOptionText}>Choose from Library</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* AI Analyzing Screen */}
      {isAnalyzing && (
        <View style={challengesStyles.analyzingOverlay}>
          <View style={challengesStyles.analyzingContent}>
            <Animated.View
              style={[
                challengesStyles.analyzingIconContainer,
                {
                  transform: [
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Ionicons name="sparkles" size={64} color="#16a34a" />
            </Animated.View>
            <Text style={challengesStyles.analyzingTitle}>AI Analyzing Your Impact...</Text>
            <Text style={challengesStyles.analyzingSubtitle}>
              {analysisMessage || 'Processing your submission...'}
            </Text>
            <View style={challengesStyles.analyzingProgress}>
              <View
                style={[
                  challengesStyles.analyzingProgressBar,
                  { width: `${analysisProgress}%` },
                ]}
              />
            </View>
            <Text style={challengesStyles.analyzingProgressText}>
              {analysisProgress}% Complete
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

// Energy Screen Component (Placeholder)
const EnergyScreen: React.FC = () => {
  return (
    <SafeAreaView style={energyStyles.container}>
      <StatusBar style="dark" />
      <View style={energyStyles.content}>
        <Text style={energyStyles.title}>Energy</Text>
        <Text style={energyStyles.subtitle}>Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
};

// Rewards Screen Component (Eco Quest Scoreboard)
const RewardsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'badges' | 'rewards'>('leaderboard');
  const currentUserPoints = 2450;
  const currentUserRank = 12;
  const currentUserBadges = 8;

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 5420, school: 'Green Valley High', badge: '🥇' },
    { rank: 2, name: 'Maya Patel', points: 4890, school: 'Eco Academy', badge: '🥈' },
    { rank: 3, name: 'Jordan Kim', points: 4650, school: 'Green Valley High', badge: '🥉' },
    { rank: 4, name: 'Sam Taylor', points: 4320, school: 'Eco Academy', badge: '' },
    { rank: 5, name: 'Riley Brown', points: 4100, school: 'Nature School', badge: '' },
    { rank: 6, name: 'Casey Lee', points: 3890, school: 'Green Valley High', badge: '' },
    { rank: 7, name: 'Morgan White', points: 3650, school: 'Eco Academy', badge: '' },
    { rank: 8, name: 'Taylor Green', points: 3420, school: 'Nature School', badge: '' },
    { rank: 9, name: 'Jamie Blue', points: 3200, school: 'Green Valley High', badge: '' },
    { rank: 10, name: 'Jordan Red', points: 2980, school: 'Eco Academy', badge: '' },
    { rank: 11, name: 'Alex Yellow', points: 2700, school: 'Nature School', badge: '' },
    { rank: 12, name: 'Ndahiro', points: 2450, school: 'Rwanda Coding Academy', badge: '', isCurrentUser: true },
    { rank: 13, name: 'Sam Purple', points: 2200, school: 'Green Valley High', badge: '' },
    { rank: 14, name: 'Casey Orange', points: 1980, school: 'Eco Academy', badge: '' },
  ];

  const badges = [
    { id: '1', name: 'Eco Warrior', icon: 'shield', color: '#16a34a', earned: true, description: 'Complete 10 eco actions' },
    { id: '2', name: 'Waste Hero', icon: 'trash', color: '#059669', earned: true, description: 'Divert 100kg of waste' },
    { id: '3', name: 'Community Leader', icon: 'people', color: '#0d9488', earned: true, description: 'Get 50 likes on posts' },
    { id: '4', name: 'Green Thumb', icon: 'leaf', color: '#10b981', earned: true, description: 'Plant 5 trees' },
    { id: '5', name: 'Recycling Master', icon: 'refresh-circle', color: '#14b8a6', earned: true, description: 'Recycle 200 items' },
    { id: '6', name: 'Carbon Neutral', icon: 'cloud', color: '#06b6d4', earned: true, description: 'Reduce 500kg CO₂' },
    { id: '7', name: 'Eco Influencer', icon: 'star', color: '#f59e0b', earned: true, description: 'Reach 1000 followers' },
    { id: '8', name: 'Sustainability Champion', icon: 'trophy', color: '#fbbf24', earned: true, description: 'Earn 5000 points' },
    { id: '9', name: 'Ocean Guardian', icon: 'water', color: '#3b82f6', earned: false, description: 'Clean 10 beaches' },
    { id: '10', name: 'Forest Protector', icon: 'tree', color: '#10b981', earned: false, description: 'Plant 20 trees' },
    { id: '11', name: 'Zero Waste', icon: 'close-circle', color: '#6366f1', earned: false, description: '30 days zero waste' },
    { id: '12', name: 'Eco Legend', icon: 'diamond', color: '#8b5cf6', earned: false, description: 'Earn 10000 points' },
  ];

  const rewards = [
    { id: '1', name: 'Eco Starter Kit', points: 500, icon: 'gift', available: true, description: 'Reusable bag, water bottle, and bamboo utensils' },
    { id: '2', name: 'Plant a Tree Certificate', points: 1000, icon: 'leaf', available: true, description: 'We\'ll plant a tree in your name' },
    { id: '3', name: 'Eco Workshop Ticket', points: 1500, icon: 'school', available: true, description: 'Free entry to sustainability workshop' },
    { id: '4', name: 'School Recognition', points: 2000, icon: 'trophy', available: true, description: 'Your school gets featured' },
    { id: '5', name: 'Eco Merchandise Pack', points: 2500, icon: 'shirt', available: false, description: 'Eco-friendly t-shirt and accessories' },
    { id: '6', name: 'VIP Eco Event Pass', points: 5000, icon: 'ticket', available: false, description: 'Exclusive access to eco summit' },
  ];

  const schoolRankings = [
    { rank: 1, name: 'Green Valley High', points: 45230, students: 120, badge: '🥇' },
    { rank: 2, name: 'Eco Academy', points: 38950, students: 95, badge: '🥈' },
    { rank: 3, name: 'Nature School', points: 32100, students: 80, badge: '🥉' },
    { rank: 4, name: 'Sustainable High', points: 28900, students: 110, badge: '' },
    { rank: 5, name: 'Green Tech School', points: 25600, students: 75, badge: '' },
  ];

  return (
    <SafeAreaView style={rewardsStyles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with User Stats */}
        <View style={rewardsStyles.header}>
          <View style={rewardsStyles.userStatsCard}>
            <View style={rewardsStyles.userStatsRow}>
              <View style={rewardsStyles.statItem}>
                <Text style={rewardsStyles.statValue}>{currentUserPoints.toLocaleString()}</Text>
                <Text style={rewardsStyles.statLabel}>Points</Text>
              </View>
              <View style={rewardsStyles.statDivider} />
              <View style={rewardsStyles.statItem}>
                <Text style={rewardsStyles.statValue}>#{currentUserRank}</Text>
                <Text style={rewardsStyles.statLabel}>Rank</Text>
              </View>
              <View style={rewardsStyles.statDivider} />
              <View style={rewardsStyles.statItem}>
                <Text style={rewardsStyles.statValue}>{currentUserBadges}</Text>
                <Text style={rewardsStyles.statLabel}>Badges</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={rewardsStyles.tabContainer}>
          <TouchableOpacity
            style={[rewardsStyles.tab, activeTab === 'leaderboard' && rewardsStyles.tabActive]}
            onPress={() => setActiveTab('leaderboard')}
          >
            <Ionicons
              name="podium"
              size={20}
              color={activeTab === 'leaderboard' ? '#16a34a' : '#6b7280'}
            />
            <Text
              style={[
                rewardsStyles.tabText,
                activeTab === 'leaderboard' && rewardsStyles.tabTextActive,
              ]}
            >
              Leaderboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[rewardsStyles.tab, activeTab === 'badges' && rewardsStyles.tabActive]}
            onPress={() => setActiveTab('badges')}
          >
            <Ionicons
              name="medal"
              size={20}
              color={activeTab === 'badges' ? '#16a34a' : '#6b7280'}
            />
            <Text
              style={[
                rewardsStyles.tabText,
                activeTab === 'badges' && rewardsStyles.tabTextActive,
              ]}
            >
              Badges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[rewardsStyles.tab, activeTab === 'rewards' && rewardsStyles.tabActive]}
            onPress={() => setActiveTab('rewards')}
          >
            <Ionicons
              name="gift"
              size={20}
              color={activeTab === 'rewards' ? '#16a34a' : '#6b7280'}
            />
            <Text
              style={[
                rewardsStyles.tabText,
                activeTab === 'rewards' && rewardsStyles.tabTextActive,
              ]}
            >
              Rewards
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'leaderboard' && (
          <View style={rewardsStyles.content}>
            {/* Top 3 Podium */}
            <View style={rewardsStyles.podiumContainer}>
              {leaderboard.slice(1, 4).map((user, index) => (
                <View
                  key={user.rank}
                  style={[
                    rewardsStyles.podiumItem,
                    index === 1 && rewardsStyles.podiumFirst,
                  ]}
                >
                  <View style={[rewardsStyles.podiumRank, { backgroundColor: index === 1 ? '#fbbf24' : index === 0 ? '#9ca3af' : '#cd7f32' }]}>
                    <Text style={rewardsStyles.podiumRankText}>#{user.rank}</Text>
                  </View>
                  <View style={rewardsStyles.podiumAvatar}>
                    <Ionicons name="person" size={32} color="#ffffff" />
                  </View>
                  <Text style={rewardsStyles.podiumName} numberOfLines={1}>
                    {user.name}
                  </Text>
                  <Text style={rewardsStyles.podiumPoints}>
                    {user.points.toLocaleString()} pts
                  </Text>
                </View>
              ))}
            </View>

            {/* Full Leaderboard */}
            <View style={rewardsStyles.leaderboardSection}>
              <Text style={rewardsStyles.sectionTitle}>Full Leaderboard</Text>
              {leaderboard.map((user) => (
                <View
                  key={user.rank}
                  style={[
                    rewardsStyles.leaderboardItem,
                    user.isCurrentUser && rewardsStyles.leaderboardItemCurrent,
                  ]}
                >
                  <View style={rewardsStyles.leaderboardLeft}>
                    <View
                      style={[
                        rewardsStyles.rankBadge,
                        user.rank <= 3 && rewardsStyles.rankBadgeTop,
                      ]}
                    >
                      <Text
                        style={[
                          rewardsStyles.rankText,
                          user.rank <= 3 && rewardsStyles.rankTextTop,
                        ]}
                      >
                        {user.rank}
                      </Text>
                    </View>
                    <View style={rewardsStyles.leaderboardAvatar}>
                      <Ionicons name="person" size={20} color="#6b7280" />
                    </View>
                    <View style={rewardsStyles.leaderboardInfo}>
                      <Text
                        style={[
                          rewardsStyles.leaderboardName,
                          user.isCurrentUser && rewardsStyles.leaderboardNameCurrent,
                        ]}
                      >
                        {user.name}
                      </Text>
                      <Text style={rewardsStyles.leaderboardSchool}>{user.school}</Text>
                    </View>
                  </View>
                  <View style={rewardsStyles.leaderboardRight}>
                    <Text
                      style={[
                        rewardsStyles.leaderboardPoints,
                        user.isCurrentUser && rewardsStyles.leaderboardPointsCurrent,
                      ]}
                    >
                      {user.points.toLocaleString()}
                    </Text>
                    <Text style={rewardsStyles.leaderboardPointsLabel}>pts</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* School Rankings */}
            <View style={rewardsStyles.schoolSection}>
              <Text style={rewardsStyles.sectionTitle}>🏫 School Rankings</Text>
              {schoolRankings.map((school) => (
                <View key={school.rank} style={rewardsStyles.schoolItem}>
                  <View style={rewardsStyles.schoolLeft}>
                    <Text style={rewardsStyles.schoolRank}>#{school.rank}</Text>
                    <View style={rewardsStyles.schoolInfo}>
                      <Text style={rewardsStyles.schoolName}>{school.name}</Text>
                      <Text style={rewardsStyles.schoolStudents}>
                        {school.students} students
                      </Text>
                    </View>
                  </View>
                  <View style={rewardsStyles.schoolRight}>
                    <Text style={rewardsStyles.schoolPoints}>
                      {school.points.toLocaleString()} pts
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'badges' && (
          <View style={rewardsStyles.content}>
            <Text style={rewardsStyles.sectionTitle}>Your Achievements</Text>
            <View style={rewardsStyles.badgesGrid}>
              {badges.map((badge) => (
                <View
                  key={badge.id}
                  style={[
                    rewardsStyles.badgeCard,
                    !badge.earned && rewardsStyles.badgeCardLocked,
                  ]}
                >
                  <View
                    style={[
                      rewardsStyles.badgeIconContainer,
                      { backgroundColor: badge.earned ? badge.color + '20' : '#e5e7eb' },
                    ]}
                  >
                    <Ionicons
                      name={badge.icon as any}
                      size={32}
                      color={badge.earned ? badge.color : '#9ca3af'}
                    />
                  </View>
                  <Text
                    style={[
                      rewardsStyles.badgeName,
                      !badge.earned && rewardsStyles.badgeNameLocked,
                    ]}
                  >
                    {badge.name}
                  </Text>
                  <Text style={rewardsStyles.badgeDescription}>{badge.description}</Text>
                  {!badge.earned && (
                    <View style={rewardsStyles.lockedOverlay}>
                      <Ionicons name="lock-closed" size={24} color="#9ca3af" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'rewards' && (
          <View style={rewardsStyles.content}>
            <Text style={rewardsStyles.sectionTitle}>Redeem Your Points</Text>
            {rewards.map((reward) => (
              <View
                key={reward.id}
                style={[
                  rewardsStyles.rewardCard,
                  !reward.available && rewardsStyles.rewardCardLocked,
                ]}
              >
                <View
                  style={[
                    rewardsStyles.rewardIconContainer,
                    { backgroundColor: reward.available ? '#d1fae5' : '#f3f4f6' },
                  ]}
                >
                  <Ionicons
                    name={reward.icon as any}
                    size={28}
                    color={reward.available ? '#16a34a' : '#9ca3af'}
                  />
                </View>
                <View style={rewardsStyles.rewardInfo}>
                  <Text
                    style={[
                      rewardsStyles.rewardName,
                      !reward.available && rewardsStyles.rewardNameLocked,
                    ]}
                  >
                    {reward.name}
                  </Text>
                  <Text style={rewardsStyles.rewardDescription}>{reward.description}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    rewardsStyles.redeemButton,
                    (!reward.available || currentUserPoints < reward.points) &&
                      rewardsStyles.redeemButtonDisabled,
                  ]}
                  disabled={!reward.available || currentUserPoints < reward.points}
                >
                  <Text
                    style={[
                      rewardsStyles.redeemButtonText,
                      (!reward.available || currentUserPoints < reward.points) &&
                        rewardsStyles.redeemButtonTextDisabled,
                    ]}
                  >
                    {currentUserPoints >= reward.points
                      ? `${reward.points} pts`
                      : 'Not enough'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Profile Screen Component
const ProfileScreen: React.FC = () => {
  const userData = {
    name: 'Ndahiro',
    username: '@ndahiro',
    school: 'Rwanda Coding Academy',
    email: 'ndahiroloicke@gmail.com',
    points: 2450,
    rank: 12,
    badges: 8,
    posts: 23,
    ecoLevel: 'Eco Champion',
    levelProgress: 65,
    joinDate: 'Jan 2024',
  };

  const recentAchievements = [
    { id: '1', name: 'Waste Hero', icon: 'trash', color: '#059669', date: '2 days ago' },
    { id: '2', name: 'Community Leader', icon: 'people', color: '#0d9488', date: '1 week ago' },
    { id: '3', name: 'Green Thumb', icon: 'leaf', color: '#10b981', date: '2 weeks ago' },
  ];

  const menuItems = [
    {
      id: '1',
      title: 'My Posts',
      icon: 'document-text',
      color: '#16a34a',
      action: () => {},
    },
    {
      id: '2',
      title: 'Achievements',
      icon: 'trophy',
      color: '#f59e0b',
      action: () => {},
    },
    {
      id: '3',
      title: 'Settings',
      icon: 'settings',
      color: '#6366f1',
      action: () => {},
    },
    {
      id: '4',
      title: 'Help & Support',
      icon: 'help-circle',
      color: '#8b5cf6',
      action: () => {},
    },
    {
      id: '5',
      title: 'About',
      icon: 'information-circle',
      color: '#6b7280',
      action: () => {},
    },
    {
      id: '6',
      title: 'Logout',
      icon: 'log-out',
      color: '#ef4444',
      action: () => {},
    },
  ];

  const getEcoLevelColor = (level: string) => {
    if (level.includes('Champion')) return '#fbbf24';
    if (level.includes('Warrior')) return '#16a34a';
    if (level.includes('Guardian')) return '#3b82f6';
    return '#6b7280';
  };

  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={profileStyles.header}>
          <View style={profileStyles.headerBackground} />
          <View style={profileStyles.profileSection}>
            {/* Avatar */}
            <View style={profileStyles.avatarContainer}>
              <View style={profileStyles.avatar}>
                <Ionicons name="person" size={48} color="#ffffff" />
              </View>
              <TouchableOpacity style={profileStyles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* User Info */}
            <Text style={profileStyles.userName}>{userData.name}</Text>
            <Text style={profileStyles.username}>{userData.username}</Text>
            <Text style={profileStyles.school}>{userData.school}</Text>

            {/* Eco Level Badge */}
            <View style={[profileStyles.ecoLevelBadge, { backgroundColor: getEcoLevelColor(userData.ecoLevel) + '20' }]}>
              <Ionicons name="leaf" size={18} color={getEcoLevelColor(userData.ecoLevel)} />
              <Text style={[profileStyles.ecoLevelText, { color: getEcoLevelColor(userData.ecoLevel) }]}>
                {userData.ecoLevel}
              </Text>
            </View>

            {/* Level Progress */}
            <View style={profileStyles.levelProgressContainer}>
              <View style={profileStyles.levelProgressBar}>
                <View style={[profileStyles.levelProgressFill, { width: `${userData.levelProgress}%` }]} />
              </View>
              <Text style={profileStyles.levelProgressText}>
                {userData.levelProgress}% to next level
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={profileStyles.statsContainer}>
          <View style={profileStyles.statCard}>
            <View style={[profileStyles.statIconContainer, { backgroundColor: '#d1fae5' }]}>
              <Ionicons name="star" size={20} color="#16a34a" />
            </View>
            <Text style={profileStyles.statValue} numberOfLines={1}>
              {userData.points.toLocaleString()}
            </Text>
            <Text style={profileStyles.statLabel} numberOfLines={1}>
              Points
            </Text>
          </View>
          <View style={profileStyles.statCard}>
            <View style={[profileStyles.statIconContainer, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="trophy" size={20} color="#f59e0b" />
            </View>
            <Text style={profileStyles.statValue} numberOfLines={1}>
              #{userData.rank}
            </Text>
            <Text style={profileStyles.statLabel} numberOfLines={1}>
              Rank
            </Text>
          </View>
          <View style={profileStyles.statCard}>
            <View style={[profileStyles.statIconContainer, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="medal" size={20} color="#3b82f6" />
            </View>
            <Text style={profileStyles.statValue} numberOfLines={1}>
              {userData.badges}
            </Text>
            <Text style={profileStyles.statLabel} numberOfLines={1}>
              Badges
            </Text>
          </View>
          <View style={profileStyles.statCard}>
            <View style={[profileStyles.statIconContainer, { backgroundColor: '#fce7f3' }]}>
              <Ionicons name="images" size={20} color="#ec4899" />
            </View>
            <Text style={profileStyles.statValue}>{userData.posts}</Text>
            <Text style={profileStyles.statLabel}>Posts</Text>
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Recent Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={profileStyles.achievementsContainer}>
            {recentAchievements.map((achievement) => (
              <View key={achievement.id} style={profileStyles.achievementCard}>
                <View style={[profileStyles.achievementIconContainer, { backgroundColor: achievement.color + '20' }]}>
                  <Ionicons name={achievement.icon as any} size={32} color={achievement.color} />
                </View>
                <Text style={profileStyles.achievementName}>{achievement.name}</Text>
                <Text style={profileStyles.achievementDate}>{achievement.date}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Account Information */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Account Information</Text>
          <View style={profileStyles.infoCard}>
            <View style={profileStyles.infoRow}>
              <View style={profileStyles.infoLeft}>
                <Ionicons name="mail" size={20} color="#6b7280" />
                <Text style={profileStyles.infoLabel}>Email</Text>
              </View>
              <Text style={profileStyles.infoValue}>{userData.email}</Text>
            </View>
            <View style={profileStyles.infoDivider} />
            <View style={profileStyles.infoRow}>
              <View style={profileStyles.infoLeft}>
                <Ionicons name="school" size={20} color="#6b7280" />
                <Text style={profileStyles.infoLabel}>School</Text>
              </View>
              <Text style={profileStyles.infoValue}>{userData.school}</Text>
            </View>
            <View style={profileStyles.infoDivider} />
            <View style={profileStyles.infoRow}>
              <View style={profileStyles.infoLeft}>
                <Ionicons name="calendar" size={20} color="#6b7280" />
                <Text style={profileStyles.infoLabel}>Member Since</Text>
              </View>
              <Text style={profileStyles.infoValue}>{userData.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Menu</Text>
          <View style={profileStyles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={profileStyles.menuItem}
                onPress={item.action}
                activeOpacity={0.7}
              >
                <View style={[profileStyles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text style={profileStyles.menuText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Version */}
        <View style={profileStyles.footer}>
          <Text style={profileStyles.footerText}>EcoSync Mobile v1.0.0</Text>
          <Text style={profileStyles.footerSubtext}>Making the world greener, one action at a time 🌱</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type OnboardingSlide = {
  key: string;
  title: string;
  description: string;
  image: any;
};

const SLIDES: OnboardingSlide[] = [
  {
    key: 'welcome',
    title: 'Welcome to EcoSync',
    description:
      'Your AI-powered companion for a smarter, greener lifestyle. Track energy, harness solar power, and make sustainable choices—effortlessly.',
    image: require('./assets/firstImage.png'),
  },
  {
    key: 'optimize-energy',
    title: 'Optimize Your Energy Usage',
    description:
      'Get real-time insights and AI recommendations to save energy, reduce costs, and protect the planet.',
    image: require('./assets/secondImage.png'),
  },
  {
    key: 'eco-challenges',
    title: 'Join Daily Eco Challenges',
    description:
      'Earn points, unlock badges, and compete with your community by turning everyday actions into impact.',
    image: require('./assets/thirdimage.png'),
  },
];

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    'Montserrat-Bold': Montserrat_700Bold,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  if (isAuthenticated) {
    return <MainAppNavigator />;
  }

  if (showAuth) {
    return (
      <AuthScreen
        isLogin={isLogin}
        onToggleAuth={() => setIsLogin(!isLogin)}
        onAuthSuccess={() => {
          setIsAuthenticated(true);
        }}
      />
    );
  }

  if (!showOnboarding) {
    return (
      <View style={introStyles.container}>
        <StatusBar style="light" translucent />
        {/* Full screen background image */}
        <Image
          source={require('./assets/firstScreenImage.png')}
          style={introStyles.backgroundImage}
          resizeMode="cover"
        />

        {/* Bottom overlay card */}
        <View style={introStyles.bottomCard}>
          <Text style={introStyles.title}>Ecosync</Text>
          <Text style={introStyles.subtitle}>
            Your personal AI guide to smarter energy use, daily eco-challenges,
            and real-time insights.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={introStyles.primaryButton}
            onPress={() => setShowOnboarding(true)}
          >
            <View style={introStyles.buttonIconWrapper}>
              <Text style={introStyles.buttonIcon}>{'>'}</Text>
            </View>
            <Text style={introStyles.buttonLabel}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <OnboardingCarousel onComplete={() => setShowAuth(true)} />;
};

// Auth Screen Styles
const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
  },
  topDecor: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
  },
  bottomDecor: {
    position: 'absolute',
    bottom: -80,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },
  logo: {
    width: 220,
    height: 110,
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    fontFamily: 'Montserrat',
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontFamily: 'Montserrat',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  submitButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#16a34a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  toggleLink: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
});

type AuthScreenProps = {
  isLogin: boolean;
  onToggleAuth: () => void;
  onAuthSuccess: () => void;
};

const AuthScreen: React.FC<AuthScreenProps> = ({
  isLogin,
  onToggleAuth,
  onAuthSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [isLogin]);

  const handleSubmit = () => {
    // Later: implement actual auth logic
    onAuthSuccess();
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <SafeAreaView style={authStyles.safeArea}>
        {/* Decorative background elements */}
        <View style={authStyles.topDecor} />
        <View style={authStyles.bottomDecor} />

        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[authStyles.content, { opacity: fadeAnim }]}
          >
            {/* Logo */}
            <Image
              source={require('./assets/logo.png')}
              style={authStyles.logo}
              resizeMode="contain"
            />

            {/* Title */}
            <Text style={authStyles.title}>
              {isLogin ? 'Welcome Back' : 'Join EcoSync'}
            </Text>
            <Text style={authStyles.subtitle}>
              {isLogin
                ? 'Sign in to continue your eco journey'
                : 'Start making a sustainable impact today'}
            </Text>

            {/* Form */}
            <View style={authStyles.form}>
              {!isLogin && (
                <View style={authStyles.inputContainer}>
                  <Text style={authStyles.label}>Full Name</Text>
                  <TextInput
                    style={authStyles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#9ca3af"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Email</Text>
                <TextInput
                  style={authStyles.input}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Password</Text>
                <TextInput
                  style={authStyles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {!isLogin && (
                <View style={authStyles.inputContainer}>
                  <Text style={authStyles.label}>Confirm Password</Text>
                  <TextInput
                    style={authStyles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
              )}

              {isLogin && (
                <TouchableOpacity style={authStyles.forgotPassword}>
                  <Text style={authStyles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={authStyles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.9}
              >
                <Text style={authStyles.submitButtonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={authStyles.divider}>
                <View style={authStyles.dividerLine} />
                <Text style={authStyles.dividerText}>OR</Text>
                <View style={authStyles.dividerLine} />
              </View>

              {/* Toggle Auth */}
              <View style={authStyles.toggleContainer}>
                <Text style={authStyles.toggleText}>
                  {isLogin
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                </Text>
                <TouchableOpacity onPress={onToggleAuth}>
                  <Text style={authStyles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

type OnboardingCarouselProps = {
  onComplete: () => void;
};

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onComplete }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1 && scrollRef.current) {
      scrollRef.current.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: (SLIDES.length - 1) * width, animated: true });
    }
  };

  return (
    <SafeAreaView style={onboardingStyles.safeArea}>
      <StatusBar style="dark" />

      {/* Decorative background circle */}
      <View style={onboardingStyles.topDecor} />
      <View style={onboardingStyles.bottomDecor} />

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {SLIDES.map((slide, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <View key={slide.key} style={{ width, paddingHorizontal: 24 }}>
              <View style={onboardingStyles.slideContainer}>
                <Animated.View
                  style={[
                    onboardingStyles.imageCircleWrapper,
                    { transform: [{ scale }], opacity },
                  ]}
                >
                  <Image
                    source={slide.image}
                    style={onboardingStyles.imageCircle}
                    resizeMode="cover"
                  />
                </Animated.View>

                <Image
                  source={require('./assets/logo.png')}
                  style={onboardingStyles.logo}
                  resizeMode="contain"
                />

                <View style={onboardingStyles.textBlock}>
                  <Text style={onboardingStyles.title}>{slide.title}</Text>
                  <Text style={onboardingStyles.description}>
                    {slide.description}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* Bottom controls */}
      <View style={onboardingStyles.bottomBar}>
        <TouchableOpacity
          style={onboardingStyles.secondaryButton}
          activeOpacity={0.8}
          onPress={handleSkip}
        >
          <Text style={onboardingStyles.secondaryLabel}>Skip</Text>
        </TouchableOpacity>

        <View style={onboardingStyles.dotsContainer}>
          {SLIDES.map((slide, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [6, 18, 6],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={slide.key}
                style={[
                  onboardingStyles.dot,
                  { width: dotWidth, opacity: dotOpacity },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={onboardingStyles.primaryButton}
          activeOpacity={0.9}
          onPress={handleNext}
        >
          <Text style={onboardingStyles.primaryLabel}>
            {currentIndex === SLIDES.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const introStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    marginBottom: 20,
    minHeight: 280,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    maxWidth: 280,
    alignSelf: 'center',
  },
  primaryButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  buttonIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonIcon: {
    fontSize: 18,
    color: '#16a34a',
    fontWeight: '700',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
});

const onboardingStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topDecor: {
    position: 'absolute',
    top: 40,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  bottomDecor: {
    position: 'absolute',
    bottom: -80,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 80,
  },
  imageCircleWrapper: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    backgroundColor: '#e5f9ec',
    marginBottom: 32,
  },
  imageCircle: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 24,
  },
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#16a34a',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  secondaryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  secondaryLabel: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
    marginHorizontal: 3,
  },
  primaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#16a34a',
  },
  primaryLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
});

// ==================== MAIN APP SCREEN STYLES ====================

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  topSection: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 8,
  },
  topSectionContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
  },
  pointsSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  pointsValue: {
    fontSize: 52,
    fontWeight: '700',
    color: '#16a34a',
    fontFamily: 'Montserrat',
    marginRight: 10,
    letterSpacing: -1,
  },
  pointsLabel: {
    fontSize: 20,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  rankBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#bbf7d0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    fontFamily: 'Montserrat',
  },
  cardsSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingRight: 8,
    gap: 16,
  },
  impactCard: {
    width: 160,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Montserrat',
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 13,
    color: '#4b5563',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: '500',
  },
  challengeCard: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  challengeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  challengeHeaderText: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  challengeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 5,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#16a34a',
    fontFamily: 'Montserrat',
  },
  timeRemaining: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  actionsSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 14,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
    lineHeight: 18,
  },
  // Hero Section
  heroSection: {
    backgroundColor: '#16a34a',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 20,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  heroContent: {
    paddingHorizontal: 20,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  heroGreeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    marginBottom: 4,
  },
  heroName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  pointsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  pointsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  // Stats Grid
  statsGrid: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  statIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  // Challenge Section
  challengeSection: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#16a34a',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  challengeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  challengeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f59e0b',
    fontFamily: 'Montserrat',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    marginBottom: 20,
    lineHeight: 20,
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
    fontFamily: 'Montserrat',
  },
  progressTime: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
  },
  // Quick Actions
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 52) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  // Activity Section
  activitySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  activityList: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  activityUser: {
    fontWeight: '700',
    color: '#111827',
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
  },
  activityPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  activityPointsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#f59e0b',
    fontFamily: 'Montserrat',
  },
});

const challengesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  postButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  filtersWrapper: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
    minHeight: 36,
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    padding: 20,
    paddingBottom: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
    fontFamily: 'Montserrat',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  pendingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f59e0b',
    fontFamily: 'Montserrat',
  },
  postImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f3f4f6',
  },
  postDescription: {
    fontSize: 15,
    color: '#374151',
    fontFamily: 'Montserrat',
    lineHeight: 22,
    padding: 16,
    paddingTop: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
    fontFamily: 'Montserrat',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
  },
  imageUploadArea: {
    width: '100%',
    height: 200,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
  },
  imageUploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Montserrat',
    marginTop: 12,
    marginBottom: 4,
  },
  imageUploadHint: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Montserrat',
    marginBottom: 10,
  },
  descriptionInput: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#111827',
    fontFamily: 'Montserrat',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#d1fae5',
    borderColor: '#16a34a',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  categoryTextActive: {
    color: '#16a34a',
    fontWeight: '600',
  },
  modalButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  analyzingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  analyzingContent: {
    alignItems: 'center',
    padding: 40,
    width: '90%',
  },
  analyzingIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  analyzingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 12,
    textAlign: 'center',
  },
  analyzingSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  analyzingProgress: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  analyzingProgressBar: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 4,
  },
  analyzingProgressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    fontFamily: 'Montserrat',
    marginTop: 12,
  },
  imagePickerModal: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  imagePickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imagePickerOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginLeft: 16,
  },
});

const energyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
});

const rewardsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  userStatsCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  userStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#16a34a',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#d1d5db',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#d1fae5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  tabTextActive: {
    color: '#16a34a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 20,
    marginTop: 8,
  },
  // Podium Styles
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 10,
    gap: 12,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  podiumFirst: {
    paddingBottom: 40,
  },
  podiumRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  podiumRankText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
    textAlign: 'center',
  },
  podiumPoints: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
    fontFamily: 'Montserrat',
  },
  // Leaderboard Styles
  leaderboardSection: {
    marginBottom: 30,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leaderboardItemCurrent: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#16a34a',
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankBadgeTop: {
    backgroundColor: '#fef3c7',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  rankTextTop: {
    color: '#f59e0b',
  },
  leaderboardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 2,
  },
  leaderboardNameCurrent: {
    color: '#16a34a',
    fontWeight: '700',
  },
  leaderboardSchool: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  leaderboardRight: {
    alignItems: 'flex-end',
  },
  leaderboardPoints: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
  },
  leaderboardPointsCurrent: {
    color: '#16a34a',
  },
  leaderboardPointsLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
  },
  // School Rankings
  schoolSection: {
    marginBottom: 20,
  },
  schoolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  schoolLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  schoolRank: {
    fontSize: 18,
    fontWeight: '700',
    color: '#16a34a',
    fontFamily: 'Montserrat',
    marginRight: 16,
    width: 30,
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  schoolStudents: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Montserrat',
  },
  schoolRight: {
    alignItems: 'flex-end',
  },
  schoolPoints: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
    fontFamily: 'Montserrat',
  },
  // Badges Styles
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  badgeCard: {
    width: (width - 52) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  badgeCardLocked: {
    opacity: 0.6,
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 6,
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: '#9ca3af',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    lineHeight: 16,
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
  },
  // Rewards Styles
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  rewardCardLocked: {
    opacity: 0.7,
  },
  rewardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardInfo: {
    flex: 1,
    marginRight: 12,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  rewardNameLocked: {
    color: '#9ca3af',
  },
  rewardDescription: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    lineHeight: 18,
  },
  redeemButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  redeemButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
  redeemButtonTextDisabled: {
    color: '#9ca3af',
  },
});

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#f0fdf4',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    marginBottom: 8,
  },
  school: {
    fontSize: 14,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
    marginBottom: 16,
  },
  ecoLevelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },
  ecoLevelText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Montserrat',
  },
  levelProgressContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  levelProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 4,
  },
  levelProgressText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'flex-start',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
    paddingRight: 20,
  },
  achievementCard: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  achievementIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Montserrat',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDate: {
    fontSize: 11,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
});

// App wrapper with SafeAreaProvider
const AppWrapper: React.FC = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};

export default AppWrapper;

