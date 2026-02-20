import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
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
  const impactCards = [
    { id: '1', iconName: 'leaf', iconLib: 'Ionicons', value: '245', unit: 'kWh', label: 'Saved', color: '#10b981', bgColor: '#d1fae5' },
    { id: '2', iconName: 'refresh-circle', iconLib: 'Ionicons', value: '1.2', unit: 'kg', label: 'Waste Diverted', color: '#059669', bgColor: '#a7f3d0' },
    { id: '3', iconName: 'earth', iconLib: 'Ionicons', value: '89', unit: 'kg', label: 'CO₂ Reduced', color: '#16a34a', bgColor: '#bbf7d0' },
  ];

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar style="dark" />
      {/* Decorative background elements */}
      <View style={homeStyles.decorativeCircle1} />
      <View style={homeStyles.decorativeCircle2} />
      
      <ScrollView
        style={homeStyles.scrollView}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Section with gradient background */}
        <View style={homeStyles.topSection}>
          <View style={homeStyles.topSectionContent}>
            <View style={homeStyles.greetingContainer}>
              <Text style={homeStyles.greeting}>Hi Kevin</Text>
              <Ionicons name="hand-left" size={24} color="#111827" style={{ marginLeft: 8 }} />
            </View>
            <View style={homeStyles.pointsSection}>
              <Text style={homeStyles.pointsValue}>2,450</Text>
              <Text style={homeStyles.pointsLabel}>Points</Text>
            </View>
            <View style={homeStyles.rankBadge}>
              <Ionicons name="trophy" size={16} color="#16a34a" style={{ marginRight: 6 }} />
              <Text style={homeStyles.rankText}>#12 in Gasabo</Text>
            </View>
          </View>
        </View>

        {/* Impact Cards - Horizontal Scroll */}
        <View style={homeStyles.cardsSection}>
          <Text style={homeStyles.sectionTitle}>Your Impact</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeStyles.cardsContainer}
          >
            {impactCards.map((card) => {
              const IconComponent = card.iconLib === 'MaterialIcons' ? MaterialIcons : Ionicons;
              return (
                <View key={card.id} style={[homeStyles.impactCard, { backgroundColor: card.bgColor }]}>
                  <View style={[homeStyles.cardIconContainer, { backgroundColor: card.color + '20' }]}>
                    <IconComponent
                      name={card.iconName as any}
                      size={28}
                      color={card.color}
                    />
                  </View>
                  <Text style={[homeStyles.cardValue, { color: card.color }]}>
                    {card.value} {card.unit}
                  </Text>
                  <Text style={homeStyles.cardLabel}>{card.label}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Active Challenge Card */}
        <View style={homeStyles.challengeCard}>
          <View style={homeStyles.challengeHeader}>
            <View style={homeStyles.challengeIconContainer}>
              <Ionicons name="trophy" size={24} color="#fbbf24" />
            </View>
            <View style={homeStyles.challengeHeaderText}>
              <Text style={homeStyles.challengeTitle}>Plastic-Free Week</Text>
              <Text style={homeStyles.challengeSubtitle}>Active Challenge</Text>
            </View>
          </View>
          <View style={homeStyles.progressContainer}>
            <View style={homeStyles.progressBar}>
              <View style={[homeStyles.progressFill, { width: '65%' }]} />
            </View>
            <View style={homeStyles.progressInfo}>
              <Text style={homeStyles.progressText}>65% Complete</Text>
              <Text style={homeStyles.timeRemaining}>3 days remaining</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={homeStyles.actionsSection}>
          <Text style={homeStyles.sectionTitle}>Quick Actions</Text>
          <View style={homeStyles.actionsContainer}>
            <TouchableOpacity style={homeStyles.actionButton} activeOpacity={0.8}>
              <View style={[homeStyles.actionIcon, { backgroundColor: '#d1fae5' }]}>
                <Ionicons name="add-circle" size={24} color="#16a34a" />
              </View>
              <View style={homeStyles.actionTextContainer}>
                <Text style={homeStyles.actionLabel}>Post Eco</Text>
                <Text style={homeStyles.actionLabel}>Action</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.actionButton} activeOpacity={0.8}>
              <View style={[homeStyles.actionIcon, { backgroundColor: '#fef3c7' }]}>
                <Ionicons name="flash" size={24} color="#f59e0b" />
              </View>
              <View style={homeStyles.actionTextContainer}>
                <Text style={homeStyles.actionLabel}>View Energy</Text>
                <Text style={homeStyles.actionLabel}>Usage</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Eco Quest Screen Component (Youth-focused waste impact reporting)
const ChallengesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
        {posts.length === 0 ? (
          <View style={challengesStyles.emptyState}>
            <Ionicons name="leaf-outline" size={64} color="#d1d5db" />
            <Text style={challengesStyles.emptyTitle}>No posts yet</Text>
            <Text style={challengesStyles.emptySubtitle}>
              Be the first to post an eco action!
            </Text>
          </View>
        ) : (
          posts.map((post) => (
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
              <Image source={post.image} style={challengesStyles.postImage} resizeMode="cover" />

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
          ))
        )}
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
            <TouchableOpacity style={challengesStyles.imageUploadArea}>
              <Ionicons name="camera" size={48} color="#9ca3af" />
              <Text style={challengesStyles.imageUploadText}>Tap to add photo</Text>
              <Text style={challengesStyles.imageUploadHint}>
                Show your eco action or impact
              </Text>
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
                  setIsAnalyzing(true);
                  setShowPostModal(false);
                  // Simulate AI analysis
                  setTimeout(() => {
                    setIsAnalyzing(false);
                    setPostDescription('');
                    setSelectedCategory('');
                    // Show success message
                  }, 3000);
                }
              }}
              disabled={!postDescription.trim()}
            >
              <Text style={challengesStyles.modalButtonText}>Submit for AI Analysis</Text>
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
              Detecting waste types, estimating impact, and calculating your score
            </Text>
            <View style={challengesStyles.analyzingProgress}>
              <View style={[challengesStyles.analyzingProgressBar, { width: '75%' }]} />
            </View>
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

// Rewards Screen Component (Placeholder)
const RewardsScreen: React.FC = () => {
  return (
    <SafeAreaView style={rewardsStyles.container}>
      <StatusBar style="dark" />
      <View style={rewardsStyles.content}>
        <Text style={rewardsStyles.title}>Rewards</Text>
        <Text style={rewardsStyles.subtitle}>Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
};

// Profile Screen Component (Placeholder)
const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar style="dark" />
      <View style={profileStyles.content}>
        <Text style={profileStyles.title}>Profile</Text>
        <Text style={profileStyles.subtitle}>Coming soon...</Text>
      </View>
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
  decorativeCircle1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
  },
  decorativeCircle2: {
    position: 'absolute',
    top: 150,
    left: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
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

const profileStyles = StyleSheet.create({
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

// App wrapper with SafeAreaProvider
const AppWrapper: React.FC = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};

export default AppWrapper;

