import React, { useState } from 'react';
import { View,Button,Text, StyleSheet, FlatList, TouchableOpacity  } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';

function HomeScreen({ navigation }) {
    const [assignments, setAssignments] = useState([
        { id: '1', title: 'Assignment 1', percentage: '0%' },
        { id: '2', title: 'Assignment 2', percentage: '0%' }
    ]);

    // Function to add a new assignment with default title and percentage
    const addAssignment = () => {
        const newId = (assignments.length + 1).toString();  // Creating a simple ID based on length
        const newTitle = "New Assignment";  // New assignment title
        const newAssignment = { id: newId, title: newTitle, percentage: '0%' };
        setAssignments([...assignments, newAssignment]);
    };

    // Render each item
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.percentageText}>{item.percentage}</Text>
                <TouchableOpacity onPress={() => handleAction(item.id)}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

    // Placeholder for button action
    const handleAction = (id) => {
        debugger
        let assignmentsFiltered = assignments.filter(el=>el.id!==id);
        setAssignments(assignmentsFiltered);
        console.log("Action for", id);

    };

    return (
        <View style={styles.container}>
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
        fontSize: 16,
    },
    percentageText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
