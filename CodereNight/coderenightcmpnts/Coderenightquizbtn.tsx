import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type CodereNightButtonProps = {
  coderePropsLabel: string;
  onPress: () => void;
  codereFontSize?: number;
  codereBtnStyles: any;
  codereIcon: boolean;
  codereImg: ImageSourcePropType;
  isDisabled: boolean;
};

const Coderenightquizbtn: React.FC<CodereNightButtonProps> = ({
  coderePropsLabel,
  onPress,
  codereFontSize,
  codereBtnStyles,
  codereIcon,
  codereImg,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ borderRadius: 12, zIndex: 100 }}
      disabled={isDisabled}
    >
      <ImageBackground
        source={codereImg}
        style={[styles.button, codereBtnStyles]}
      >
        <Text style={[styles.coderenighttxt, { fontSize: codereFontSize }]}>
          {coderePropsLabel}
        </Text>
        {codereIcon && (
          <Image
            source={require('../../assets/icons/coderenightcoin.png')}
            style={{ width: 26, height: 26 }}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 111,
    height: 41,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
    gap: 3,
  },
  coderenighttxt: {
    fontFamily: 'Sansation-Bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Coderenightquizbtn;
