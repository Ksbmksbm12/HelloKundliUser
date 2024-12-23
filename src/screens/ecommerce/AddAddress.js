import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import MyStatusBar from '../../components/MyStatusbar';
import MyHeader from '../../components/MyHeader';
import { Colors, Fonts, Sizes } from '../../assets/style';
import * as EcommerceActions from '../../redux/actions/ecommerceActions';
import { showToastMessage } from '../../utils/services';
import { SCREEN_WIDTH } from '../../config/Screen';

const AddAddress = ({ navigation, dispatch, customerData }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [area, setArea] = useState('');
    const [select, setSelect] = useState('');

    // Function to check for special characters
    const containsSpecialCharacters = (input) => {
        const specialCharPattern = /[^a-zA-Z0-9\s]/;
        return specialCharPattern.test(input);
    };

    // Function to validate phone numbers (10 digits)
    const validatePhone = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    // Function to validate pincode (6 digits)
    const validatePincode = (pincode) => {
        const pincodePattern = /^[0-9]{6}$/;
        return pincodePattern.test(pincode);
    };

    const handleAddAddress = () => {
        // Validation Errors Object
        const errors = {};

        // Check if fields are empty and set error messages
        if (!name) errors.name = 'Name is required';
        if (!phone) errors.phone = 'Phone number is required';
        if (!pincode) errors.pincode = 'Pincode is required';
        if (!state) errors.state = 'State is required';
        if (!city) errors.city = 'City is required';
        if (!houseNo) errors.houseNo = 'House No is required';
        if (!area) errors.area = 'Area is required';
        if (!select) errors.select = 'Please select Home or Work';

        // Special character validation for fields
        if (name && containsSpecialCharacters(name)) errors.name = 'Name cannot contain special characters';
        if (state && containsSpecialCharacters(state)) errors.state = 'State cannot contain special characters';
        if (city && containsSpecialCharacters(city)) errors.city = 'City cannot contain special characters';
        if (houseNo && containsSpecialCharacters(houseNo)) errors.houseNo = 'House No cannot contain special characters';
        if (area && containsSpecialCharacters(area)) errors.area = 'Area cannot contain special characters';

        // Phone number validation
        if (phone && !validatePhone(phone)) errors.phone = 'Please enter a valid 10-digit phone number';

        // Pincode validation
        if (pincode && !validatePincode(pincode)) errors.pincode = 'Please enter a valid 6-digit pincode';

        // Show first validation error (if any)
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const firstErrorKey = errorKeys[0];
            showToastMessage({ message: errors[firstErrorKey], type: 'warning' });
            return;
        }

        // If no errors, perform API call or form submission
        const payload = {
            phone,
            name,
            pincode,
            state,
            city,
            houseno: houseNo,
            area,
            select,
            customerId: customerData?._id,
        };

        dispatch(EcommerceActions.onAddressCart(payload));
    };

    return (
        <View>
            <MyStatusBar />
            <MyHeader title={'Add Address'} navigation={navigation} />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ paddingBottom: 40 }}>
                    <View style={styles.lableInputContainer}>
                        <Text style={styles.lableText}>Full Name *</Text>
                        <TextInput
                            placeholderTextColor={'black'}
                            style={styles.input}
                            placeholder="Enter Full Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.lableInputContainer}>
                        <Text style={styles.lableText}>Phone Number *</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'black'}
                            placeholder="Enter Phone Number"
                            value={phone}
                            keyboardType="phone-pad"
                            onChangeText={setPhone}
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.lableInputContainer}>
                        <Text style={styles.lableText}>Pin Code *</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'black'}
                            placeholder="Pincode"
                            value={pincode}
                            keyboardType="numeric"
                            onChangeText={setPincode}
                            maxLength={6}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                        <View style={[styles.lableInputContainer, { width: '50%' }]} >
                            <Text style={styles.lableText}>State *</Text>
                            <TextInput
                                style={{ ...styles.input, width: '95%' }}
                                placeholder="State"
                                placeholderTextColor={'black'}
                                value={state}
                                onChangeText={setState}
                            />
                        </View>

                        <View style={[styles.lableInputContainer, { width: '50%' }]}>
                            <Text style={styles.lableText}>City *</Text>
                            <TextInput
                                style={{ ...styles.input, width: '95%' }}
                                placeholder="City"
                                placeholderTextColor={'black'}
                                value={city}
                                onChangeText={setCity}
                            />
                        </View>


                    </View>

                    <View style={styles.lableInputContainer}>
                        <Text style={styles.lableText}>House No *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="House No"
                            placeholderTextColor={'black'}
                            value={houseNo}
                            onChangeText={setHouseNo}
                        />
                    </View>

                    <View style={styles.lableInputContainer}>
                        <Text style={styles.lableText}>Area *</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'black'}
                            placeholder="Area"
                            value={area}
                            onChangeText={setArea}
                        />
                    </View>


                    {/* Buttons for Home and Work */}
                    <View style={styles.selectContainer}>
                        <TouchableOpacity
                            style={[styles.selectButton, select === 'Home' && styles.selectedButton]}
                            onPress={() => setSelect('Home')}
                        >
                            <Text style={styles.selectButtonText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.selectButton, select === 'Work' && styles.selectedButton]}
                            onPress={() => setSelect('Work')}
                        >
                            <Text style={styles.selectButtonText}>Work </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitButton} onPress={handleAddAddress}>
                        <Text style={styles.submitButtonText}>Add Address</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f2f2f2',
        flexGrow: 1,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        ...Fonts.JostRegularBlack,
    },
    submitButton: {
        backgroundColor: '#F7CF2B',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 25,
    },
    selectContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    selectButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 40,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: Sizes.fixPadding * 2,
        margin: 2,
    },
    selectedButton: {
        borderColor: Colors.primaryDark,
        borderWidth: 2,
    },
    selectButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    lableText: {
        ...Fonts.JostMediumBlack
    },
    lableInputContainer: {
        gap: 6
    }

});
