// --- AddExerciseItem.tsx ---
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import { fontFamilyMap, theme } from '../styling/stylingStandards';
import { TrackingMetric, MetricToNiceString } from '../db/database';

export const AddExerciseItem = ({
  newExerciseName,
  setNewExerciseName,
  selectedMetric,
  setSelectedMetric,
  items,
  setItems,
  open,
  setOpen,
  handleAddNewExercise,
}: any) => (
  <View style={styles.newItemContainer}>
    <View style={styles.inputContainer}>
      <CustomTextInput
        placeholder="New exercise name..."
        value={newExerciseName}
        onChangeText={setNewExerciseName}
        style={styles.input}
      />
    </View>

    <View style={styles.row}>
      <View style={styles.dropdownWrapper}>
        <DropDownPicker
          open={open}
          value={selectedMetric}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedMetric}
          setItems={setItems}
          style={styles.dropDownPicker}
          dropDownContainerStyle={{
            backgroundColor: theme.Colors.primary_100,
            zIndex: 3000,
          }}
          listMode="SCROLLVIEW"
          zIndex={3000}
          zIndexInverse={1000}
          maxHeight={600}
          labelStyle={{
            fontFamily: fontFamilyMap[theme.FontWeights.regular],
            fontSize: theme.FontSizes.medium,
          }}
          renderListItem={(props) => (
            <Pressable
              onPress={() => {
                setSelectedMetric(props.value);
                setOpen(false);
              }}
              style={{ padding: 12 }}
            >
              <CustomText weight={theme.FontWeights.regular} size={theme.FontSizes.medium}>
                {props.label}
              </CustomText>
            </Pressable>
          )}
        />
      </View>

      <Pressable style={styles.addButton} onPress={handleAddNewExercise}>
        <CustomText
          weight={theme.FontWeights.bold}
          size={theme.FontSizes.large}
          color={theme.Colors.background}
        >
          Add
        </CustomText>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  newItemContainer: {
    backgroundColor: theme.Colors.primary_100,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    borderWidth: 1,
    borderColor: theme.Colors.accent_100,
    width: '100%',
    zIndex: 3000,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: theme.FontSizes.large,
    marginBottom: theme.Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropdownWrapper: {
    flex: 1,
    marginRight: theme.Spacing.sm,
    maxWidth: '70%',
    zIndex: 3000,
    elevation: 5,
  },
  dropDownPicker: {
    backgroundColor: theme.Colors.background,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.Colors.primary,
    borderRadius: theme.Radius.md,
    paddingHorizontal: theme.Spacing.lg,
    paddingVertical: theme.Spacing.sm,
    height: 48,
    zIndex: 1000,
  },
});
