// Image declarations
declare module "*.png" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpg" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpeg" {
    const content: string;
    export default content;
  }
  
  declare module "*.svg" {
    const content: string;
    export default content;
  }
  
  declare module "*.gif" {
    const content: string;
    export default content;
  }
  
  // Add react-phone-input-2 module declaration
  declare module "react-phone-input-2" {
    import { ComponentProps } from "react";
  
    interface PhoneInputProps extends ComponentProps<"input"> {
      country?: string;
      value?: string;
      onChange?: (phone: string) => void;
      containerStyle?: React.CSSProperties;
      inputStyle?: React.CSSProperties;
      buttonStyle?: React.CSSProperties;
      placeholder?: string;
    }
  
    const PhoneInput: React.FC<PhoneInputProps>;
    export default PhoneInput;
  }
  
  // Add any other custom type declarations here