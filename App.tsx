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
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const { width } = Dimensions.get('window');

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

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  if (showAuth) {
    return (
      <AuthScreen
        isLogin={isLogin}
        onToggleAuth={() => setIsLogin(!isLogin)}
        onAuthSuccess={() => {
          // Later navigate to home
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

export default App;

