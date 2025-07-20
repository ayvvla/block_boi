import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import {
  createBackInStockNotificationRequest,
  BackInStockNotificationsValues,
} from "../wix-api/backInStockNotifications";
import { wixBrowserClient } from "../lib/wix-client.browser";

export function useCreateBackInStockNotificationRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: BackInStockNotificationsValues) =>
      createBackInStockNotificationRequest(wixBrowserClient, values),
    onError(error) {
      console.error("Error creating back in stock notification:", error);
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "You have already requested a notification for this item.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Failed to create back in stock notification. Please try again.",
        });
      }
    },
  });
}
