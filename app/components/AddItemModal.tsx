import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export interface AddItemModalProps<T, U> {
  visible: boolean;
  onClose: () => void;
  onAdd: (shell: U) => Promise<T>;
  createShell: (name: string) => U;
  placeholder?: string;
  title?: string;
}

export default function AddItemModal<T, U>({
  visible,
  onClose,
  onAdd,
  createShell,
  placeholder = "Add Item...",
  title = "Add Item",
}: AddItemModalProps<T, U>) {
  const [itemName, setItemName] = useState("");

  const handleAdd = () => {
    const trimmed = itemName.trim();
    if (!trimmed) return;

    const shell = createShell(trimmed);

    onAdd(shell)
      .then((result) => {})
      .catch((err) => {
        console.error("AddItemModal Error:", err);
      });

    setItemName("");
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onClose}
    >
      <View style={styles.modal}>
        <Text style={styles.modalText}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={itemName}
          onChangeText={setItemName}
        />
        <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.text}>Close</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.text}>Add</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 200,
    height: 200,
    backgroundColor: "#f2ab",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 30,
    color: "#cf2a",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#000",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  text: {
    color: "#fff",
  },
});
