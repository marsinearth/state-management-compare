import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {FILTER_TITLES} from '../models/todo';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';
import {observer} from 'mobx-react-lite';
import {useMst} from '../models/root';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const FilterModal: FC<ModalProps> = observer(({show, onClose}) => {
  const {filter, setFilter} = useMst();
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
            setFilter(val as string);
            onClose();
          }}>
          {Object.entries(FILTER_TITLES).map(([value, label], index) => (
            <Picker.Item key={label} label={label} value={value} />
          ))}
        </Picker>
      </View>
    </Modal>
  );
});

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
