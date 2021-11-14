import { FormEvent, useContext, useEffect, useState } from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';

import { EditImages } from '../components/EditImages';
import { ModalDelete } from '../components/ModalDelete';
import { AddressInputGroup } from '../components/AddressInputGroup';

import { AuthContext } from '../contexts/AuthContext';

import { faExternalLinkAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import moment from 'moment';

import api from '../services/api';

import { IAnimal, IAnimalImage, IReservation } from '../types';
import { ButtonGoBack } from '../components/ButtonGoBack';

interface IAnimalIdParams {
  animal_id: string;
}

export function EditAnimal() {
  const history = useHistory();
  const { animal_id } = useParams<IAnimalIdParams>();

  const { userId, userType } = useContext(AuthContext);

  const [loadingInfo, setLoadingInfo] = useState(true);
  const [userHasPermission, setUserHasPermission] = useState(false);

  const [animalVolunteerId, setAnimalVolunteerId] = useState('');

  const [previewName, setPreviewName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [kind, setKind] = useState('none');
  const [gender, setGender] = useState('none');
  const [birth_date, setBirthDate] = useState('');

  const [uf, setUF] = useState('');
  const [place, setPlace] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');

  const [images, setImages] = useState<IAnimalImage[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [animalIsAdopted, setAnimalIsAdopted] = useState(false);
  const [adoptedReservationId, setAdoptedReservationId] = useState<string>('');

  const [cepIsValid, setCepIsValid] = useState(true);

  async function handleSave(event: FormEvent) {
    event.preventDefault();

    if (!cepIsValid) {
      alert('CEP Inválido');
      return;
    }

    try {
      const { data } = await api.put<IAnimal | undefined>(
        `/animal/${animal_id}`,
        {
          name,
          description,
          kind,
          gender,
          birth_date,
          zip,
          uf,
          place,
          number,
          complement,
          neighborhood,
          city,
        }
      );
      if (typeof data !== 'undefined') {
        setAnimalVolunteerId(data.volunteer_id);
        setPreviewName(data.name);
        setName(data.name);
        setDescription(data.description);
        setKind(data.kind);
        setGender(data.gender);
        setBirthDate(data.birth_date);
        setZip(data.address.zip);
        setUF(data.address.uf);
        setPlace(data.address.place);
        setNumber(data.address.number);
        setComplement(data.address.complement);
        setNeighborhood(data.address.neighborhood);
        setCity(data.address.city);
      } else {
        history.go(0);
      }

      alert('Animal Editado com sucesso!');
    } catch {
      history.go(0);
      alert('Animal Não Pôde Ser Editado!');
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/animal/${animal_id}`);

      alert(`${name} Excluído com sucesso!`);

      history.push('/app/animais');
    } catch {
      alert('Aconteceu algum erro durante a exclusão!');
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setLoadingInfo(true);
        const { data } = await api.get(`/animal/${animal_id}`);

        if (typeof data !== 'undefined') {
          setAnimalVolunteerId(data.volunteer_id);

          setPreviewName(data.name);
          setName(data.name);
          setDescription(data.description);
          setKind(data.kind);
          setGender(data.gender);
          setBirthDate(data.birth_date);
          setZip(data.address.zip);
          setUF(data.address.uf);
          setPlace(data.address.place);
          setNumber(data.address.number);
          setComplement(data.address.complement);
          setNeighborhood(data.address.neighborhood);
          setCity(data.address.city);

          setAnimalIsAdopted(!data.available);

          setImages(data.images);
          setLoadingInfo(false);
        }
      } catch {
        alert('Animal Não Encontrado!');
        history.push('/app/animais');
      }
    })();
  }, [animal_id, history]);

  useEffect(() => {
    if (animalIsAdopted) {
      (async () => {
        const { data } = await api.get<IReservation | undefined>(
          `/reservation/adopted/${animal_id}`
        );

        if (typeof data !== 'undefined') {
          setAdoptedReservationId(data.id);
        }
      })();
    }
  }, [animalIsAdopted, animal_id]);

  useEffect(() => {
    setUserHasPermission(false);
    if (userId === animalVolunteerId) setUserHasPermission(true);
    if (userType === 'admin') setUserHasPermission(true);
  }, [userId, userType, animalVolunteerId]);

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <form onSubmit={handleSave}>
        <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
          <div className="p-4 bg-gray-100 border-t-2 border-blue-400 rounded-lg bg-opacity-5">
            <ButtonGoBack />
            <h1 className="inline-block align-bottom text-2xl">
              <span className="font-semibold">
                {userHasPermission && 'Editar'} animal:{' '}
              </span>
              {previewName}
            </h1>
          </div>
          {animalIsAdopted && adoptedReservationId !== '' && (
            <div className="bg-white">
              <hr />
              <div className="py-6">
                <Link
                  className="px-4 text-gray-800 hover:text-blue-900"
                  to={`/app/reserva/${adoptedReservationId}`}
                >
                  <span className="hover:underline font-semibold mr-1">
                    Visualizar informações de adoção
                  </span>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </Link>
              </div>
              <hr />
            </div>
          )}
          <div className="space-y-6 bg-white">
            <hr />

            <EditImages
              altAnimalName={name}
              images={images}
              setImages={setImages}
              animalId={animal_id}
              userHasPermission={userHasPermission}
            />

            <hr />

            <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">
                Informações do animal
              </h2>
              <div className="max-w-sm mx-auto md:w-2/3">
                <div className="relative">
                  <label htmlFor="name" className="text-gray-900">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    disabled={!userHasPermission}
                    value={loadingInfo ? '...' : name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
                  />
                  <label htmlFor="description" className="text-gray-900">
                    Descrição
                  </label>
                  <textarea
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    id="description"
                    disabled={!userHasPermission}
                    value={loadingInfo ? '...' : description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    name="description"
                    rows={5}
                    cols={40}
                  />
                  <div className="flex items-center gap-8 mt-4">
                    <label className="block">
                      <span className="text-gray-700">Tipo</span>
                      <select
                        className="form-select block w-full mt-1 rounded-lg"
                        onChange={(event) => {
                          setKind(event.target.value);
                        }}
                        value={kind}
                      >
                        <option value="dog">Cachorro</option>
                        <option value="cat">Gato</option>
                        <option value="none">Escolha</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex items-center gap-8 mt-4">
                    <label className="block">
                      <span className="text-gray-700">Gênero</span>
                      <select
                        className="form-select block w-full mt-1 rounded-lg"
                        value={gender}
                        onChange={(event) => {
                          setGender(event.target.value);
                        }}
                      >
                        <option value="female">Fêmea</option>
                        <option value="male">Macho</option>
                        <option value="none">Escolha</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="relative mt-6">
                  <div>
                    <label htmlFor="birth_date">Data de nascimento</label>

                    <input
                      type="date"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      id="birth_date"
                      name="birth_date"
                      value={
                        loadingInfo
                          ? ''
                          : moment(birth_date).format('YYYY-MM-DD')
                      }
                      onChange={(event) => {
                        setBirthDate(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <AddressInputGroup
              autoCompleteOnProp={false}
              uf={loadingInfo ? '...' : uf}
              setUF={setUF}
              place={loadingInfo ? '...' : place}
              setPlace={setPlace}
              number={loadingInfo ? '...' : number}
              setNumber={setNumber}
              city={loadingInfo ? '...' : city}
              setCity={setCity}
              neighborhood={loadingInfo ? '...' : neighborhood}
              setNeighborhood={setNeighborhood}
              complement={loadingInfo ? '...' : complement}
              setComplement={setComplement}
              cep={loadingInfo ? '...' : zip}
              setCep={setZip}
              cepIsValid={cepIsValid}
              setCepIsValid={setCepIsValid}
            />
            <hr />
            <div className="w-full px-4 pb-4 text-gray-500 flex">
              {/* CANCEL - Go Back */}
              <Link
                to="/app/animais"
                className="inline-block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                <button type="button">Cancelar (Voltar)</button>
              </Link>
              {userHasPermission && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="inline-block ml-2 py-2 px-4 left-0 inset-y-0 items-center pl-3 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="sm"
                      className="mr-2 text-red-300 group-hover:text-red-700"
                    />
                    Excluir Animal
                  </button>
                  <button
                    type="submit"
                    className="inline-block ml-2 py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Editar Animal
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
      <ModalDelete
        title={'Você deseja realmente excluir este animal?'}
        handleSubmit={handleDelete}
        open={openModal}
        setOpen={setOpenModal}
      />
    </section>
  );
}
