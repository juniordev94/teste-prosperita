import {
  Col,
  Container,
  Input,
  Label,
  Row,
  FormGroup,
  FormFeedback,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import Lottie from "react-lottie";
import LoginLottie from "../lotties/login.json";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as Yup from "yup";
import ApiService from "../services/api";
import { User } from "../types";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import useStorage from "../hooks/useStorage";

type FormValues = {
  username: string;
  password: string;
};

const initialValues: FormValues = {
  username: "",
  password: "",
};

const FormSchema = Yup.object().shape({
  username: Yup.string().required("Usuário é obrigatório"),
  password: Yup.string().required('Senha é obrigatório'),
});

const Login = () => {
  const navigate = useNavigate();
  const { setStorage } = useStorage();
  const { setUser } = useAuth();

  const handleFormSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    helpers.setSubmitting(true);

    try {
      const { data } = await ApiService.HttpGet<User[]>({
        route: "users",
        params: values,
      });

      let user = undefined;

      if (data.length > 0) {
        user = data.find((user) => {
          return (
            user.username === values.username &&
            user.password === values.password
          );
        });
      }

      if (user) {
        setStorage("user", user)
        setUser(user);

        toast.info("Logado com sucesso, redirecionando...");

        navigate("/app");
      } else {
        throw new Error("Usuário e/ou senha inválidos");
      }
    } catch (e) {
      toast.error("Usuário e/ou senha inválidos");
      helpers.setErrors({
        username: "Usuário e/ou senha inválidos",
        password: "Usuário e/ou senha inválidos",
      });
    }

    helpers.setSubmitting(false);
  };

  return (
    <div className="bg-dark">
      <div className="animate__animated animate__fadeIn">
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={FormSchema}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
          }: FormikProps<FormValues>) => (
            <Container className="min-vh-100 d-flex align-items-center justify-content-center">
              <Card style={{ width: "100%", maxWidth: 800 }}>
                <CardBody>
                  <Row className="align-items-center">
                    

                    <Col xs={12} md={6} className="d-none d-md-flex">
                      <Lottie
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: LoginLottie,
                          rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice",
                          },
                        }}
                      />
                    </Col>

                    <Col xs={12} md={6}>
                      <Form onSubmit={handleSubmit}>
                        <h3 className="mb-3">
                          <strong>Iniciar sessão</strong>
                        </h3>

                        <FormGroup className="w-100">
                          <Label className="form-label fw-light mb-1 text-dark">
                            Usuário
                          </Label>
                          <Input
                            className=" form-control-solid"
                            name="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={
                              touched.username ? !!errors.username : undefined
                            }
                            valid={touched.username && !errors.username}
                            placeholder="example@prosperita.com.br"
                          />
                          
                          {errors.username && (
                            <FormFeedback>
                            { errors.username }
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className="w-100">
                          <Label className="form-label fw-light mb-1 text-dark">
                            Senha
                          </Label>
                          <Input
                            className=" form-control-solid"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={
                              touched.password ? !!errors.password : undefined
                            }
                            valid={touched.password && !errors.password}
                            placeholder="******"
                          />
                          {errors.password && (
                            <FormFeedback>
                            { errors.password }
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <div className="text-center text-lg-start mt-2 pt-2">                          
                          <div className="text-end">
                            <Button 
                              type="submit" 
                              color="primary" 
                              disabled={!isValid || isSubmitting}
                              block
                            >
                            { isSubmitting &&
                              <>
                                <FontAwesomeIcon 
                                  spin 
                                  icon={faCircleNotch} 
                                />
                                <span className="ms-2">
                                  Carregando
                                </span>
                              </>
                            }
                            { !isSubmitting && 'Acessar'}                              
                            </Button>
                          </div>
                          <p className="small mt-3 pt-1 mb-0">
                            Não possui conta?{" "}
                            <Link to="/register" className="link-danger">
                              Registrar-se
                            </Link>
                          </p>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Container>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
