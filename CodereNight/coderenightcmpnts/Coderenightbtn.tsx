import {
  Image,
  ImageBackground,
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
};

const Coderenightbtn: React.FC<CodereNightButtonProps> = ({
  coderePropsLabel,
  onPress,
  codereFontSize,
  codereBtnStyles,
  codereIcon,
  codereImg,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
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
    backgroundColor: '#006633',
    width: 171,
    height: 63,
    // borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'rgba(160, 160, 160, 1)',
    flexDirection: 'row',
    gap: 3,
  },
  coderenighttxt: {
    fontFamily: 'Sansation-Bold',
    fontSize: 18,
    color: '#fff',
  },
});

export default Coderenightbtn;
