import {
  FILTER_TITLES,
  FilterContext,
  FilterEnum,
} from '../contexts/filterContext';
import React, {FC, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const FilterModal: FC<ModalProps> = ({show, onClose}) => {
  const [{filter}, setFilter] = useContext(FilterContext);
  return (
    <Modal isVisible={show} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalTitleContainer}>
          <Text style={styles.modalTitle}>Choose Filter</Text>
        </View>
        <Picker
          selectedValue={filter}
          style={styles.pickerContainer}
          onValueChange={(val) => {
            const key = val as FilterEnum;
            setFilter((prev) => ({...prev, filter: key}));
            onClose();
          }}>
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
