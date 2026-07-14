import { Dialog, Portal, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  showThanks: boolean;
  setShowThanks: (value: boolean) => void;
};

function ModalChekout({ showThanks, setShowThanks }: Props) {
  const navigate = useNavigate();
  return (
    <Dialog.Root open={showThanks} onOpenChange={(e) => setShowThanks(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="xl" p={6} maxW="sm" textAlign="center">
            <Dialog.Header>
              <Dialog.Title fontSize="2xl" fontWeight="bold">
                ¡Gracias por tu compra! 🎉
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color="gray.500">
              Tu pedido fue procesado correctamente.
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                colorPalette="purple"
                borderRadius="md"
                onClick={() => {
                  setShowThanks(false);
                  navigate("/");
                }}
              >
                Volver al inicio
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default ModalChekout;
