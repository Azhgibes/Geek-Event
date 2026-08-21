"use client"; 
 
import {   FormEvent,   useEffect,   useState, } from "react"; import {   useParams,   useRouter, } from "next/navigation"; import Link from "next/link"; import { 
  ArrowLeft, 
  CalendarDays, 
  MapPin, 
  Building2, 
  Trash2, 
  Plus, 
  Save, 
} from "lucide-react"; 
 
interface Nomination { 
  id: string;   title: string;   description: string;   type: string;   registration: boolean; 
} 
 
interface CreatedEvent { 
  id: string;   slug: string;   title: string;   city: string;   venue?: string;   address?: string;   date: string;   description: string;   shortDescription?: string;   heroText?: string;   categories?: string[];   participants?: number;   rating?: number;   registration?: boolean;   nominations?: Nomination[];   status: "pending" | "published" | "rejected";   createdAt: string;   organizer: {     name: string;     email: string; 
  }; 
} 
 
interface UserData {   name: string;   surname?: string;   email: string;   isLoggedIn?: boolean;   role?: "admin" | "user"; } 
 
export default function EditEventPage() {   const router = useRouter();   const params = useParams(); 
 
  const id = params.id as string; 
 
  const [loading, setLoading] = useState(true);   const [event, setEvent] =     useState<CreatedEvent | null>(null); 
 
  const [title, setTitle] = useState("");   const [city, setCity] = useState("");   const [venue, setVenue] = useState("");   const [address, setAddress] = useState("");   const [date, setDate] = useState("");   const [description, setDescription] =     useState(""); 
 
  const [nominations, setNominations] =     useState<Nomination[]>([]); 
 
  const [nominationTitle, setNominationTitle] =     useState(""); 
 
  const [     nominationDescription,     setNominationDescription, 
  ] = useState(""); 
 
  const [nominationType, setNominationType] = 
    useState(""); 
 
  const [     nominationRegistration,     setNominationRegistration, 
  ] = useState(true); 
 
  /* 
   * Загружаем мероприятие 
   */ 
  useEffect(() => {     const savedUser =       localStorage.getItem("geek-event-user"); 
 
    if (!savedUser) {       router.replace("/login");       return; 
    }      try { 
      const parsedUser: UserData = 
        JSON.parse(savedUser); 
 
      if (parsedUser.isLoggedIn !== true) {         router.replace("/login");         return; 
      } 
 
      const savedEvents =         localStorage.getItem( 
          "geek-event-created" 
        ); 
 
      if (!savedEvents) {         router.replace("/account");         return; 
      } 
 
      const parsedEvents = 
        JSON.parse(savedEvents); 
 
      if (!Array.isArray(parsedEvents)) {         router.replace("/account");         return; 
      } 
 
      const foundEvent =         parsedEvents.find(           (item: CreatedEvent) =>             item.id === id 
        ); 
 
      if (!foundEvent) {         router.replace("/account");         return; 
      } 
 
      /* 
*	Организатор может редактировать 
*	только своё мероприятие. 
       */       if ( 
        foundEvent.organizer?.email &&         foundEvent.organizer.email !==           parsedUser.email &&         parsedUser.role !== "admin" 
      ) { 
        router.replace("/account");         return; 
      } 
 
      setEvent(foundEvent); 
 
      setTitle(foundEvent.title || "");       setCity(foundEvent.city || "");       setVenue(foundEvent.venue || "");       setAddress(foundEvent.address || "");       setDate(foundEvent.date || "");       setDescription(         foundEvent.description || "" 
      ); 
 
      setNominations( 
        Array.isArray(foundEvent.nominations) 
          ? foundEvent.nominations 
          : [] 
      ); 
 
      setLoading(false);     } catch {       router.replace("/account"); 
    } 
  }, [id, router]); 
 
  /* 
   * Добавление новой номинации 
  */ 
  const addNomination = () => {     if (!nominationTitle.trim()) {       return; 
    } 
 
    const newNomination: Nomination = {       id: crypto.randomUUID(), 
 
      title: nominationTitle.trim(), 
 
      description: 
        nominationDescription.trim(), 
 
      type: 
        nominationType.trim(), 
 
      registration: 
        nominationRegistration, 
    }; 
 
    setNominations((current) => [       ...current, 
      newNomination, 
    ]); 
 
    setNominationTitle("");     setNominationDescription("");     setNominationType("");     setNominationRegistration(true); 
  }; 
 
  /* 
   * Удаление номинации 
   */ 
  const removeNomination = (     nominationId: string   ) => {     setNominations((current) => 
      current.filter(         (nomination) =>           nomination.id !== nominationId 
      ) 
    ); 
  }; 
 
  /* 
   * Изменение существующей номинации 
   */ 
  const updateNomination = (     nominationId: string,     field: keyof Nomination,     value: string | boolean 
  ) => {     setNominations((current) =>       current.map((nomination) => { 
        if ( 
          nomination.id !== nominationId 
        ) { 
          return nomination; 
        } 
         return { 
          ...nomination, 
          [field]: value, 
        }; 
      }) 
    ); 
  }; 
 
  /* 
   * Сохранение мероприятия 
   */ 
  const handleSave = (     formEvent: FormEvent<HTMLFormElement> 
  ) => {     formEvent.preventDefault(); 
 
    if (!event) {       return; 
    } 
 
    const savedEvents =       localStorage.getItem( 
        "geek-event-created" 
      ); 
 
    if (!savedEvents) {       return; 
    }      try { 
      const parsedEvents = 
        JSON.parse(savedEvents); 
 
      if (!Array.isArray(parsedEvents)) {         return; 
      } 
 
      const updatedEvents =         parsedEvents.map(           (item: CreatedEvent) => {             if (item.id !== id) {               return item; 
            }              return { 
              ...item,                title: title.trim(), 
               city: city.trim(),                venue: 
                venue.trim() || undefined, 
               address: 
                address.trim() || undefined, 
               date, 
 
              description: 
                description.trim(), 
 
              shortDescription:                 description.trim(), 
 
              nominations, 
 
              /* 
*	После любого изменения                * мероприятие снова проходит 
*	модерацию. 
               */ 
              status: "pending", 
            }; 
          } 
        ); 
 
      localStorage.setItem( 
        "geek-event-created", 
        JSON.stringify(updatedEvents) 
      ); 
 
      router.push("/account"); 
    } catch {       return; 
    } 
  }; 
 
  /* 
   * Загрузка 
     */   if (loading) {     return ( 
      <main className="min-h-screen w-full overflow-x-hidden bg-zinc-950 text-white"> 
        <div className="flex min-h-screen w-full items-center justify-center px-4"> 
          <div className="text-zinc-400"> 
            Загружаем мероприятие... 
          </div> 
        </div> 
      </main> 
    ); 
  } 
 
  if (!event) {     return null; 
  } 
 
  return ( 
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8"> 
      <div className="mx-auto w-full min-w-0 max-w-5xl"> 
 
        {/* Назад */} 
 
        <Link           href="/account"           className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white" 
        > 
          <ArrowLeft size={18} /> 
          Вернуться в личный кабинет 
        </Link> 
 
        {/* Заголовок */} 
 
        <div className="mb-8 w-full min-w-0"> 
          <p className="text-sm font-medium text-violet-400"> 
            Geek Event 
          </p> 
 
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl"> 
            Редактирование мероприятия 
          </h1> 
 
          <p className="mt-3 max-w-3xl text-zinc-400">             Измените информацию о мероприятии,             настройте собственные номинации и             отправьте обновлённую версию на             повторную модерацию. 
          </p> 
        </div> 
 
        <form           onSubmit={handleSave}           className="w-full min-w-0 space-y-6" 
        > 
 
          {/* ================================= */} 
          {/* ОСНОВНАЯ ИНФОРМАЦИЯ */} 
          {/* ================================= */} 
 
          <section className="w-full min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"> 
 
            <div className="mb-6"> 
              <h2 className="text-xl font-bold"> 
                Основная информация 
              </h2> 
 
              <p className="mt-1 text-sm text-zinc-500"> 
                Измените данные мероприятия. 
              </p> 
            </div> 
 
            <div className="w-full min-w-0 space-y-5"> 
 
              {/* Название */} 
 
              <div className="w-full min-w-0"> 
                <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                  Название мероприятия 
                </label> 
 
                <input                   type="text"                   value={title}                   onChange={(event) => 
                    setTitle(                       event.target.value 
                    )                   }                   required 
                  className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc800 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ringviolet-500/20" 
                /> 
              </div> 
 
              {/* Город */} 
 
              <div className="w-full min-w-0"> 
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300"> 
                  <MapPin size={16} /> 
                  Город 
                </label> 
 
                <input                   type="text"                   value={city}                   onChange={(event) => 
                    setCity(                       event.target.value                     )                   }                   required 
                  className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc800 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ringviolet-500/20" 
                /> 
              </div> 
 
              {/* Место */} 
              
              <div className="w-full min-w-0"> 
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300"> 
                  <Building2 size={16} /> 
                  Место проведения 
                </label> 
 
                <input                   type="text"                   value={venue}                   onChange={(event) =>                     setVenue(                       event.target.value 
                    ) 
                  } 
                  className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc800 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ringviolet-500/20" 
                /> 
              </div> 
 
              {/* Адрес */} 
 
              <div className="w-full min-w-0"> 
                <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                  Адрес 
                </label> 
 
                <input                   type="text"                   value={address}                   onChange={(event) =>                     setAddress(                       event.target.value 
                    ) 
                  } 
                  className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc800 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ringviolet-500/20" 
                /> 
              </div> 
 
              {/* Дата */} 
 
              <div className="w-full min-w-0"> 
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300"> 
                  <CalendarDays size={16} /> 
                  Дата мероприятия 
                </label> 
 
                <input                   type="date"                   value={date}                   onChange={(event) => 
                    setDate(                       event.target.value 
                    )                   }                   required 
                  className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc800 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ringviolet-500/20" 
                /> 
              </div> 
 
              {/* Описание */} 
 
              <div className="w-full min-w-0"> 
                <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                  Описание 
                </label> 
 
                <textarea                   value={description}                   onChange={(event) =>                     setDescription(                       event.target.value 
                    ) 
                  }                   rows={7}                   required                   className="box-border w-full min-w-0 resize-y rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" 
                /> 
              </div> 
 
            </div> 
          </section> 
 
          {/* ================================= */} 
          {/* НОМИНАЦИИ */} 
          {/* ================================= */} 
 
          <section className="w-full min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"> 
 
            <div className="mb-6"> 
              <h2 className="text-xl font-bold"> 
                Номинации 
              </h2> 
 
              <p className="mt-1 max-w-2xl text-sm text-zinc-500">                 Создайте собственную структуру                 конкурса. Названия, описания и                 типы номинаций не привязаны к 
                DVIZH-FEST или другим мероприятиям. 
              </p> 
            </div> 
 
            {/* Существующие номинации */} 
 
            {nominations.length > 0 ? ( 
              <div className="mb-8 w-full min-w-0 space-y-4"> 
 
                {nominations.map( 
                  (nomination, index) => ( 
                    <div                       key={nomination.id} 
                      className="w-full min-w-0 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6" 
                    > 
 
                      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justifybetween"> 
                        <div> 
                          <p className="text-xs font-medium uppercase tracking-wider text-violet-400"> 
                            Номинация {index + 1} 
                          </p> 
 
                          <p className="mt-1 text-sm text-zinc-500"> 
                            Её можно изменить в любой момент. 
                          </p> 
                        </div> 
 
                        <button                           type="button"                           onClick={() =>                             removeNomination(                               nomination.id 
                            ) 
                          } 
className="inline-flex w-fit items-center gap-2 rounded-xl border border-red500/30 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10" 
                        > 
                          <Trash2 size={16} /> 
                          Удалить 
                        </button> 
                      </div> 
 
                      <div className="w-full min-w-0 space-y-4"> 
 
                        {/* Название */} 
                        
                        <div className="w-full min-w-0"> 
                          <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                            Название номинации 
                          </label> 
 
                          <input                             type="text"                             value={                               nomination.title 
                            } 
                            onChange={(event) =>                               updateNomination(                                 nomination.id, 
                                "title",                                 event.target.value 
                              ) 
                            } 
                            className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bgzinc-800 px-4 py-3 text-white outline-none transition focus:border-violet-500" 
/> 
                        </div> 
 
                        {/* Описание */} 
 
                        <div className="w-full min-w-0"> 
                          <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                            Описание номинации 
                          </label> 
 
                          <textarea                             value={                               nomination.description 
                            } 
                            onChange={(event) =>                               updateNomination(                                 nomination.id,                                 "description",                                 event.target.value 
                              )                             }                             rows={4} 
                            className="box-border w-full min-w-0 resize-y rounded-xl border border-zinc700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-violet-500" 
                          /> 
                        </div> 
 
                        {/* Тип */} 
 
                        <div className="w-full min-w-0"> 
<label className="mb-2 block text-sm font-medium text-zinc-300"> 
                            Тип / направление 
                          </label> 
 
                          <input                             type="text"                             value={                               nomination.type 
                            } 
                            onChange={(event) =>                               updateNomination(                                 nomination.id, 
                                "type",                                 event.target.value 
                              ) 
                            } 
                            placeholder="Например: Cosplay, K-POP, Танцы, Музыка" 
                            className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bgzinc-800 px-4 py-3 text-white outline-none transition focus:border-violet-500" 
                          /> 
                        </div> 
 
                        {/* Регистрация */} 
 
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300"> 
                          <input                             type="checkbox"                             checked={                               nomination.registration 
                            } 
                            onChange={(event) =>                               updateNomination(                                 nomination.id,                                 "registration",                                 event.target.checked 
                              ) 
                            } 
                            className="h-4 w-4 accent-violet-600" 
                          /> 
 
                          <span> 
                            Регистрация на эту номинацию открыта 
                          </span> 
                        </label> 
 
                      </div> 
                    </div> 
                  ) 
                )} 
 
              </div> 
            ) : ( 
              <div className="mb-8 rounded-2xl border border-dashed border-zinc-700 p-8 textcenter"> 
                <p className="font-medium text-zinc-300"> 
                  Номинаций пока нет 
                </p> 
 
                <p className="mt-2 text-sm text-zinc-500"> 
                  Создайте первую номинацию 
                  ниже.                 </p> 
              </div> 
            )} 
 
            {/* Добавление номинации */} 
 
            <div className="w-full min-w-0 rounded-2xl border border-violet-500/20 bg-violet500/5 p-5 sm:p-6"> 
 
              <div className="mb-5"> 
                <h3 className="text-lg font-semibold"> 
                  Добавить номинацию 
                </h3> 
 
                <p className="mt-1 text-sm text-zinc-500">                   Организатор сам определяет,                   какие номинации будут на его                   мероприятии. 
                </p> 
              </div> 
 
              <div className="w-full min-w-0 space-y-4"> 
 
                {/* Название */} 
 
                <div className="w-full min-w-0"> 
                  <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                    Название номинации 
                  </label> 
 
                  <input                     type="text"                     value={nominationTitle}                     onChange={(event) =>                       setNominationTitle(                         event.target.value 
                      ) 
                    } 
                    placeholder="Например: Лучший сценический образ" 
                    className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc-
800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet500" 
                  /> 
                </div> 
 
                {/* Описание */} 
 
                <div className="w-full min-w-0"> 
                  <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                    Описание 
                  </label> 
 
                  <textarea                     value={                       nominationDescription 
                    } 
                    onChange={(event) =>                       setNominationDescription(                         event.target.value 
                      ) 
                    } 
                    placeholder="Расскажите участникам, что представляет собой эта номинация..." 
                    rows={4} 
                    className="box-border w-full min-w-0 resize-y rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:borderviolet-500" 
                  /> 
                </div> 
 
                {/* Тип */} 
 
                <div className="w-full min-w-0"> 
                  <label className="mb-2 block text-sm font-medium text-zinc-300"> 
                    Тип / направление 
                  </label> 
 
                  <input                     type="text"                     value={nominationType}                     onChange={(event) =>                       setNominationType(                         event.target.value 
                      ) 
                    } 
                    placeholder="Например: Cosplay, K-POP, Dance, Музыка" 
                    className="box-border w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc-
800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet500" 
                  /> 
                </div> 
 
                {/* Регистрация */} 
 
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border borderzinc-800 bg-zinc-900 p-4 text-sm text-zinc-300"> 
                  <input                     type="checkbox"                     checked={                       nominationRegistration 
                    } 
                    onChange={(event) =>                       setNominationRegistration(                         event.target.checked 
                      ) 
                    } 
                    className="h-4 w-4 accent-violet-600" 
                  /> 
 
                  <span> 
                    Регистрация на номинацию открыта 
                  </span> 
                </label> 
 
                {/* Добавить */} 
 
                <button                   type="button"                   onClick={addNomination} 
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-5 py-3 font-semibold text-violet-300 transition hover:bg-violet-500/20" 
                > 
                  <Plus size={18} /> 
                  Добавить номинацию 
                </button> 
 
              </div> 
            </div> 
 
          </section> 
 
          {/* ================================= */} 
          {/* ИНФОРМАЦИЯ О МОДЕРАЦИИ */} 
          {/* ================================= */} 
 
          <div className="w-full min-w-0 rounded-2xl border border-yellow-500/20 bg-yellow500/5 p-5"> 
            <p className="font-medium text-yellow-300"> 
              Важно 
            </p> 
 
            <p className="mt-2 text-sm leading-6 text-zinc-400">               После сохранения изменений               мероприятие снова будет отправлено               на модерацию администрации Geek Event. 
            </p> 
          </div> 
 
          {/* ================================= */} 
          {/* КНОПКИ */} 
          {/* ================================= */} 
 
          <div className="flex w-full min-w-0 flex-col-reverse gap-3 sm:flex-row sm:justify-end"> 
 
            <Link               href="/account" 
              className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-medium textzinc-300 transition hover:border-zinc-500 hover:text-white" 
            > 
              Отмена 
            </Link> 
 
            <button               type="submit" 
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90" 
            > 
              <Save size={18} /> 
              Сохранить и отправить на модерацию 
            </button> 
 
          </div> 
 
        </form> 
      </div> 
    </main> 
  ); 
} 



