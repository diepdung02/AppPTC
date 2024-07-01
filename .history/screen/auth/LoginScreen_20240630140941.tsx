import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Color';

type LoginProps = {
  navigation: any;
};

type FormValues = {
  username: string;
  password: string;
};

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);

  useEffect(() => {
    const checkRememberPassword = async () => {
      try {
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedPassword) {
          setRememberPassword(true);
        }
      } catch (error) {
        console.error('Error reading password from AsyncStorage:', error);
      }
    };
    checkRememberPassword();
  }, []);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogin = (values: FormValues) => {
    // Hiện thông báo đăng nhập thành công và điều hướng đến HomeScreen
    alert('Đăng nhập thành công!');
    navigation.navigate('Home');
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Chưa nhập tên đăng nhập'),
    password: Yup.string().required('Chưa nhập mật khẩu'),
  });

  return (
    <Formik
      initialValues={{
        username: ,
        password: '123',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleLogin(values)}
    >
      {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
        <View style={styles.container}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="black" />
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
          </View>
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="black" />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={hidePassword}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <MaterialIcons name={hidePassword ? 'visibility-off' : 'visibility'} size={20} color="black" />
            </TouchableOpacity>
          </View>
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit as any}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: COLORS.blue,
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#005A8C',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
  },
});

export default LoginScreen;
