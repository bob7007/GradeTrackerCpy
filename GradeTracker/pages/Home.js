import React, { useState } from 'react';
import { View,Button,Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput  } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import CustomModal from '../components/customModal';

function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [assignments, setAssignments] = useState([
        { id: '1', title: 'edit assignment...', percentage: 0,default:true },
        { id: '2', title: 'edit assignment...', percentage: 0,default:true }
    ]);

    const openModal = (id) => {
        let itemToEdit = assignments.find(item => item.id === id);
        if (itemToEdit) {
            if(itemToEdit.default){
                itemToEdit.title='';
                itemToEdit.percentage='';
            }
            setCurrentItem(itemToEdit);
            setModalVisible(true);
        }
    };
    
    const saveEdits = () => {
        console.log(currentItem);

        const updatedAssignments = assignments.map(item => {
        if (item.id === currentItem.id) {
            const updatedItem = { ...currentItem }; // Create a copy of currentItem
            if (updatedItem.default) {
                updatedItem.default = false; // Update default to false if it's initially true
            }
            return updatedItem;
        }
        return item;
        });
        console.log(updatedAssignments);
        setAssignments(updatedAssignments);
    };
    // Function to add a new assignment with default title and percentage
    const addAssignment = () => {
        const newId = (assignments.length + 1).toString();  // Creating a simple ID based on length
        const newTitle = "edit assignment...";  // New assignment title
        const newAssignment = { id: newId, title: newTitle, percentage: 0, default:true  };
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
            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                saveEdits={saveEdits}
            />
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
    button: {
        flexDirection: 'row', // Icon and text in a row
        backgroundColor: '#5bc0de', // Example button color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center', // Center items vertically within the button
        justifyContent: 'center' // Center items horizontally within the button
    },

});

export default HomeScreen;
