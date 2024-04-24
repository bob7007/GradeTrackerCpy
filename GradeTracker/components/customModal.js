import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomModal = ({ modalVisible, setModalVisible, currentItem, setCurrentItem, saveEdits }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setCurrentItem({ ...currentItem, title: text })}
                        value={currentItem?.title}
                        placeholder="Edit title"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            // Check if the entered text is a valid number with up to one decimal place and between 0 and 100
                            if (/^\d{0,2}(\.\d{0,1})?$/.test(text) || text === '') {
                                setCurrentItem({ ...currentItem, percentage: text });
                            }
                        }}
                        value={currentItem?.percentage}
                        placeholder="Edit percentage"
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                saveEdits();
                                setModalVisible(false);
                            }}
                        >
                            <MaterialIcons name="save" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <MaterialIcons name="cancel" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        flex:2,
        fontSize: 16,
    },
    percentageText: {
        flex:2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        width: '90%',
        marginBottom: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
        flexDirection: 'row', // Icon and text in a row
        backgroundColor: '#5bc0de', // Example button color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center', // Center items vertically within the button
        justifyContent: 'center' // Center items horizontally within the button
    },
    buttonText: {
        color: '#fff', // Text color
        marginLeft: 10, // Space between the icon and the text
    },
});

export default CustomModal;
