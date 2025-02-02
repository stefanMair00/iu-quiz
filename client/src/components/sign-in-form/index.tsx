import './style.scss';
import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik';
import { useState } from 'react';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { BiShow, BiHide } from 'react-icons/bi';
import { useAuthStore } from '../../sotres';
import {
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = { email: '', password: '' };

function SignInForm() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { showSignUpForm, signIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (
    { email, password }: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const { success, message } = await signIn(email, password);

    const status = success ? 'success' : 'error';

    toast({
      description: message,
      status: status
    });

    setSubmitting(false);

    if (success) {
      navigate(routes.Dashboard.path);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text as="b" fontSize="4xl" color="teal.500">
              Anmelden
            </Text>

            {/*------------------- Email --------------------*/}

            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="email">Email</FormLabel>

                  <InputGroup>
                    <Input
                      borderColor="teal.500"
                      autoComplete="on"
                      {...field}
                      id="email"
                      placeholder="max.muster@iu-study.org"
                    />
                    <InputLeftElement>
                      <RiMailLine />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/*------------------- Password --------------------*/}

            <Field name="password">
              {({ field }: FieldProps) => (
                <FormControl>
                  <FormLabel htmlFor="password">Passwort</FormLabel>
                  <InputGroup>
                    <Input
                      borderColor="teal.500"
                      autoComplete="on"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Passwort eingeben"
                      {...field}
                    />
                    <InputLeftElement>
                      <RiLockPasswordLine />
                    </InputLeftElement>
                    <InputRightElement width="4.5rem">
                      <Button
                        size="xs"
                        fontSize="1xl"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BiShow /> : <BiHide />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              )}
            </Field>

            {/*------------------- Form Submit -----------------*/}

            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Anmelden
            </Button>

            <Text>
              Noch keinen Account?{' '}
              <Button
                type="button"
                variant="link"
                colorScheme="teal"
                fontWeight="extrabold"
                onClick={() => showSignUpForm()}
              >
                Jetzt registrieren
              </Button>
            </Text>
          </Form>
        )}
      </Formik>
    </>
  );
}

export { SignInForm };
