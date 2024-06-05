import { useWindowDimensions } from "react-native";
export const useMediaQuery = () => {
    const {width,height} = useWindowDimensions();
    const isSm = width <= 480;
    const isMd = width > 480 && width <= 768;
    const isLg = width > 768 && width <= 1024;
    const isXl = width > 1024;
    return { isSm, isMd, isLg, isXl,height,width};
};