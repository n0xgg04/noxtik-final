import * as React from "react";
import { Animated, ViewProps, StyleSheet, FlexAlignType } from "react-native";
import AnimatedProps = Animated.AnimatedProps;

type Props = {
  direction: "row" | "column";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: FlexAlignType;
  children: React.ReactNode;
  gap?: number;
} & AnimatedProps<ViewProps>;

export default function Stack({
  direction,
  justifyContent,
  alignItems,
  children,
  gap,
  ...props
}: Props) {
  return (
    <Animated.View
      {...props}
      style={[
        direction === "column" ? styles.columnContainer : styles.rowContainer,
        {
          justifyContent,
          alignItems,
          gap,
        },
        props.style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
  },
});
