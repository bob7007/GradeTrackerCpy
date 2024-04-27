import React, { useState } from 'react';
import { View,Button,Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput  } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';



function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [assignments, setAssignments] = useState([
        { id: '1', title: 'edit assignment...', percentage: '0%' },
        { id: '2', title: 'edit assignment...', percentage: '0%' }
    ]);

    const openModal = (id) => {
        const itemToEdit = assignments.find(item => item.id === id);
        if (itemToEdit) {
            setCurrentItem(itemToEdit);
            setModalVisible(true);
        }
    };
    
    const saveEdits = () => {
        const updatedAssignments = assignments.map(item => {
            if (item.id === currentItem.id) {
                return currentItem;
            }
            return item;
        });
        setAssignments(updatedAssignments);
    };
    // Function to add a new assignment with default title and percentage
    const addAssignment = () => {
        const newId = (assignments.length + 1).toString();  // Creating a simple ID based on length
        const newTitle = "edit assignment...";  // New assignment title
        const newAssignment = { id: newId, title: newTitle, percentage: '0%' };
        setAssignments([...assignments, newAssignment]);
    };

    // Render each item
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <TouchableOpacity style={{flexDirection: 'row', flex:4}} onPress={() => openModal(item.id)}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Text style={styles.percentageText}>{item.percentage}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} onPress={() => deleteEntry(item.id)}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

    // Placeholder for button action
    const deleteEntry = (id) => {
        let assignmentsFiltered = assignments.filter(el=>el.id!==id);
        setAssignments(assignmentsFiltered);
    };

    return (
        <View style={styles.container}>
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
                            onChangeText={text => setCurrentItem({ ...currentItem, percentage: text })}
                            value={currentItem?.percentage}
                            placeholder="Edit percentage"
                            keyboardType="numeric"
                        />
                        <View>
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

            <Button title="Add New Assignment" onPress={addAssignment} />
            <FlatList
                data={assignments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

// Styles for the Home screen and list items
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

export default HomeScreen;
