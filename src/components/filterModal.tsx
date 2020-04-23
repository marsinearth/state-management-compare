import {FILTER_TITLES, FilterEnum, setFilter} from '../redux/filterSlice';
import React, {FC, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';
import {RootReducer} from 'src/redux/store';
import {createSelector} from '@reduxjs/toolkit';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const filterSelector = createSelector<RootReducer, FilterEnum, FilterEnum>(
  ({filter}) => filter.name,
  (filter) => filter,
);

const FilterModal: FC<ModalProps> = ({show, onClose}) => {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);
  return (
    <Modal isVisible={show} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalTitleContainer}>
          <Text style={styles.modalTitle}>Choose Filter</Text>
        </View>
        <Picker
          selectedValue={filter}
          style={styles.pickerContainer}
          onValueChange={useCallback(
            (val) => {
              const key = val as FilterEnum;
              dispatch(setFilter(key));
              onClose();
            },
            [dispatch, onClose],
          )}>
          {Object.entries(FILTER_TITLES).map(([value, label]) => (
            <Picker.Item key={label} label={label} value={value} />
          ))}
        </Picker>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 25,
  },
  modalTitleContainer: {
    padding: 25,
  },
  modalTitle: {
    fontSize: 20,
  },
  pickerContainer: {
    width: 150,
  },
});

export default FilterModal;
