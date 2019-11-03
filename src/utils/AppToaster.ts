import { Position, Toaster, IToastProps } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP
});

const showToast = (
    message: string,
    intent: IToastProps["intent"],
    icon?: IToastProps["icon"]
) => {
    AppToaster.show({
        message,
        intent,
        icon
    });
};

export default showToast;
