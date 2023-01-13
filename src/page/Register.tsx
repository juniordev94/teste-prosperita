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
import RegisterLottie from "../lotties/register.json";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "../types";

import * as Yup from "yup";
import ApiService from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

type FormValues = {
  username: string;
  email: string;
  birthdate: string;
  gender: string;
  password: string;
  confirm_password?: string;
};

const initialValues: FormValues = {
  username: "",
  email: "",
  birthdate: "",
  gender: "",
  password: "",
  confirm_password: "",
};


const FormSchema = Yup.object().shape({
  username: Yup.string().required("Usuário é obrigatório"),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  birthdate: Yup.date()
    .required("Data de nascimento é obrigatório")
    .max(new Date(), "Data de nascimento inválida"),
  gender: Yup.string().required("Gênero é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
  confirm_password: Yup.string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([Yup.ref("password"), null], "Senhas não conferem"),
});

const Register = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    helpers.setSubmitting(true);

    delete values.confirm_password

    try {
      await ApiService.HttpPost<User>({
        route: "users",
        body: values,
      });

      navigate("/login");

      toast.info("Cadastrado com sucesso, logue-se na plataforma...");
    } catch (e) {
      toast.error("Erro ao realizar cadastro");
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
            submitForm,
          }: FormikProps<FormValues>) => (
            <Container className="min-vh-100 d-flex align-items-center justify-content-center">
              <Card style={{ width: "100%", maxWidth: 800 }}>
                <CardBody>
                  <Row className="align-items-center">
                    <Col className="d-none d-md-block" xs={12} md={6}>
                      <Lottie
                        options={{
                          loop: false,
                          autoplay: true,
                          animationData: RegisterLottie,
                          rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice",
                          },
                        }}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Form onSubmit={handleSubmit}>
                        <h3 className="mb-3">
                          <strong>Cadastre-se</strong>
                        </h3>

                        <FormGroup className="mb-3">
                          <Label className="form-label fw-light mb-1 text-dark">
                            Usuário
                          </Label>
                          <Input
                            className="form-control-solid"
                            name="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={
                              touched.username ? !!errors.username : undefined
                            }
                            valid={touched.username && !errors.username}
                            placeholder="Digite seu usuário"
                          />
                          {errors.username && (
                            <FormFeedback>{errors.username}</FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Label className="form-label fw-light mb-1 text-dark">
                            E-mail
                          </Label>
                          <Input
                            className="form-control-solid"
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.email ? !!errors.email : undefined}
                            valid={touched.email && !errors.email}
                            placeholder="Digite seu usuário"
                          />
                          {errors.email && (
                            <FormFeedback>{errors.email}</FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Label className="form-label fw-light mb-1 text-dark">
                            Data de nascimento
                          </Label>
                          <Input
                            className="form-control-solid"
                            name="birthdate"
                            type="date"
                            value={values.birthdate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={
                              touched.birthdate ? !!errors.birthdate : undefined
                            }
                            valid={touched.birthdate && !errors.birthdate}
                            placeholder="Digite seu usuário"
                          />
                          {errors.birthdate && (
                            <FormFeedback>{errors.birthdate}</FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Label className="form-label fw-light mb-1 text-dark">
                            Genero
                          </Label>
                          <Input
                            className="form-control-solid"
                            name="gender"
                            type="select"
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={
                              touched.gender ? !!errors.gender : undefined
                            }
                            valid={touched.gender && !errors.gender}
                            placeholder="Digite seu usuário"
                          >
                            <option value="">Selecione</option>
                            <option value="Male">Masculino</option>
                            <option value="Female">Feminino</option>
                          </Input>
                          {errors.gender && (
                            <FormFeedback>{errors.gender}</FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className=" mb-3">
                          <Label className="form-label fw-light mb-1 text-dark">
                            Senha
                          </Label>
                          <Input
                            className="form-control-solid"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={
                              touched.password ? !!errors.password : undefined
                            }
                            valid={touched.password && !errors.password}
                            placeholder="Digite sua senha"
                          />
                          {errors.password && (
                            <FormFeedback>{errors.password}</FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className=" mb-3">
                          <Label className="form-label fw-light mb-1 text-dark">
                            Confirmar senha
                          </Label>
                          <Input
                            className="form-control-solid"
                            name="confirm_password"
                            type="password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={
                              touched.confirm_password
                                ? !!errors.confirm_password
                                : undefined
                            }
                            valid={
                              touched.confirm_password &&
                              !errors.confirm_password
                            }
                            placeholder="Digite sua senha"
                          />
                          {errors.confirm_password && (
                            <FormFeedback>
                              {errors.confirm_password}
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
                            { isSubmitting && (
                              <>
                                <FontAwesomeIcon
                                  spin 
                                  icon={faCircleNotch} 
                                />
                                <span className="ms-2">
                                  Carregando
                                </span>
                              </>
                            )}
                            { !isSubmitting && 'Acessar'}                              
                            </Button>
                          </div>
                          <p className="small mt-3 pt-1 mb-0">
                            Já possui uma conta?{" "}
                            <Link to="/login" className="link-danger">
                              Logue-se
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

export default Register;
