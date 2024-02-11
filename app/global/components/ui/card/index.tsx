import * as React from "react";
import { Animated, StyleSheet, View, ViewProps } from "react-native";
import Stack from "@/global/components/utils/stack";
import { BorderRadiusConstants } from "@/global/theme/border_radius";
import { hp, wp } from "@/global/utils/responsive";
import AnimatedProps = Animated.AnimatedProps;

type Props = {
  children: React.ReactNode;
  image?: React.ReactNode;
  relativeElement?: React.ReactNode;
} & AnimatedProps<ViewProps>;
export default function Card({
  children,
  image,
  relativeElement,
  ...props
}: Props) {
  return (
    <Animated.View style={styles.card}>
      {relativeElement}
      <Stack
        {...props}
        gap={5}
        style={[
          props.style,
          styles.inside,
          {
            position: "relative",
            height: "100%",
            width: "100%",
          },
        ]}
        direction="column"
      >
        {image}
        <View style={styles.content}>{children}</View>
      </Stack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(3),
  },
  card: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: BorderRadiusConstants.lg,
    elevation: 5,
    paddingBottom: hp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  inside: {
    borderRadius: BorderRadiusConstants.lg,
    overflow: "hidden",
  },
});
