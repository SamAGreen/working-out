import { Modal, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../styling/stylingStandards";
import CustomText from "./CustomText";

interface DeleteItemModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  itemName: string;
  itemType: string;
  handleDelete: () => void;
}
const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  showModal,
  setShowModal,
  itemName,
  itemType,
  handleDelete,
}) => {
  return (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <CustomText
            weight={theme.FontWeights.bold}
            size={theme.FontSizes.xl}
            color={theme.Colors.text}
            style={{ marginBottom: theme.Spacing.md, textAlign: "center" }}
          >
            Delete {itemType}?
          </CustomText>

          <CustomText
            weight={theme.FontWeights.regular}
            size={theme.FontSizes.medium}
            color={theme.Colors.text_800}
            style={{ marginBottom: theme.Spacing.lg, textAlign: "center" }}
          >
            Are you sure you want to delete {itemName}?
          </CustomText>

          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowModal(false)}
            >
              <CustomText
                weight={theme.FontWeights.medium}
                size={theme.FontSizes.medium}
                color={theme.Colors.text}
              >
                Cancel
              </CustomText>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <CustomText
                weight={theme.FontWeights.medium}
                size={theme.FontSizes.medium}
                color={theme.Colors.background}
              >
                Delete
              </CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: theme.Spacing.sm,
    borderRadius: theme.Radius.sm,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: theme.Colors.background_100,
    marginRight: theme.Spacing.sm,
  },
  deleteButton: {
    backgroundColor: theme.Colors.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: theme.Colors.background,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.lg,
    width: "80%",
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
  },
});

export default DeleteItemModal;
